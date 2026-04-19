import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import './RegisterSection.css';

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(5, "Phone number is required").max(20),
  attendees: z.string().min(1, "Number of attendees is required"),
});

type FormValues = z.infer<typeof schema>;

export default function RegisterSection() {
  const { ref, visible } = useScrollReveal();
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", attendees: "1" },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Pull the deployed Web App URL from environment variables
    const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;
    
    if (!scriptUrl) {
      toast({
        title: "Configuration Missing",
        description: "Google Sheets URL not added to environment variables.",
        variant: "destructive"
      });
      console.warn("MISSING VITE_GOOGLE_SHEETS_URL. Form data:", data);
      setIsSubmitting(false);
      return;
    }

    try {
      // Use URLSearchParams (x-www-form-urlencoded) to ensure clean POSTing to Google Apps Script
      const formData = new URLSearchParams();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('attendees', data.attendees.toString());

      // Use mode: 'no-cors' to bypass strict browser CORS preflight checks entirely
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      // With no-cors, fetch resolves unconditionally if there is no hard network failure
      toast({
        title: "Registration received!",
        description: `Thank you ${data.name}, we'll be in touch soon.`,
      });
      form.reset();
      
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was a network error sending your registration. Please try again.",
        variant: "destructive"
      });
      console.error("Google Sheets Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="min-h-screen relative bg-[#120E15] overflow-hidden flex items-center">
      {/* Subtle glowing texture matching the theme */}
      <div className="absolute inset-0 opacity-[0.03] bg-texture-move point-events-none" />
      <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-gradient-to-bl from-primary/10 to-transparent blur-[120px] pointer-events-none" />

      <div ref={ref} className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-[1600px] py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          
          {/* ── LEFT SIDE: Dramatic Typography & Context ── */}
          <div 
            className={`flex flex-col space-y-8 transition-all duration-1000 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div>
              <p className="font-body text-primary/60 tracking-[0.3em] uppercase text-sm mb-6">
                Gateway to the dhām
              </p>
              <h2 className="font-heading text-6xl sm:text-7xl lg:text-[7rem] leading-[0.85] text-gold-gradient">
                Begin<br/>Your<br/>Journey
              </h2>
            </div>
            
            <div className="w-16 h-px bg-primary/30" />
            
            <div className="space-y-6 max-w-md">
              <p className="font-body text-foreground/70 text-lg leading-relaxed font-light">
                Spaces for the Braj Ras retreat are highly exclusive to ensure an intimate and profound experience for every seeker. 
              </p>
              <p className="font-body text-foreground/50 text-base leading-relaxed italic">
                By submitting this registry, you express your intent to immerse yourself deeply in the sacred mellows of Vrindavan. Our volunteers will review your application and reach out to guide you through the next steps as soon as possible! meanwhile keep chanting Hare Krishna Mahamantra!!
              </p>
            </div>
          </div>

          {/* ── RIGHT SIDE: Minimalist Form ── */}
          <div 
            className={`transition-all duration-1200 ease-out delay-200 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                
                {/* Custom Minimalist Inputs */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="relative group">
                      <FormControl>
                        <Input
                          {...field}
                          className="test-input"
                          placeholder=" " // Required for the floating label trick
                        />
                      </FormControl>
                      <FormLabel className="test-label">Full Name</FormLabel>
                      <div className="test-input-line" />
                      <FormMessage className="absolute -bottom-6 text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="relative group">
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="test-input"
                          placeholder=" "
                        />
                      </FormControl>
                      <FormLabel className="test-label">Email Address</FormLabel>
                      <div className="test-input-line" />
                      <FormMessage className="absolute -bottom-6 text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="relative group">
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            className="test-input"
                            placeholder=" "
                          />
                        </FormControl>
                        <FormLabel className="test-label">Phone</FormLabel>
                        <div className="test-input-line" />
                        <FormMessage className="absolute -bottom-6 text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="attendees"
                    render={({ field }) => (
                      <FormItem className="relative group">
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            min="1"
                            max="20"
                            className="test-input"
                            placeholder=" "
                          />
                        </FormControl>
                        <FormLabel className="test-label">Attendees</FormLabel>
                        <div className="test-input-line" />
                        <FormMessage className="absolute -bottom-6 text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative flex items-center justify-between w-full p-6 bg-transparent border border-primary/20 hover:border-primary/60 transition-colors duration-500 overflow-hidden ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="absolute inset-0 bg-primary/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                    <span className="relative z-10 font-heading text-2xl tracking-wider text-primary group-hover:text-gold-light transition-colors duration-500">
                      {isSubmitting ? "Sending..." : "Submit Registry"}
                    </span>
                    <ArrowRight className="relative z-10 w-6 h-6 text-primary group-hover:translate-x-2 transition-transform duration-500" />
                  </button>
                </div>

              </form>
            </Form>
          </div>

        </div>
      </div>
    </section>
  );
}
