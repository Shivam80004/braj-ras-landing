import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useToast } from "@/hooks/use-toast";

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

  const onSubmit = (data: FormValues) => {
    toast({
      title: "Registration received!",
      description: `Thank you ${data.name}, we'll be in touch soon.`,
    });
    form.reset();
  };

  return (
    <section id="register" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-royal/20 to-maroon-deep/30" />

      <div ref={ref} className="container mx-auto max-w-xl relative z-10">
        <div className="text-center mb-12">
          <h2
            className={`font-heading text-3xl sm:text-4xl md:text-5xl text-gold-gradient transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Begin Your Journey
          </h2>
          <p className="font-body text-foreground/60 text-lg mt-4 italic">
            Reserve your place in this sacred retreat
          </p>
          <div className="ornament-divider max-w-xs mx-auto mt-6">
            <span className="text-primary text-sm">✦</span>
          </div>
        </div>

        <div
          className={`gold-border rounded-lg p-8 md:p-10 bg-card/50 backdrop-blur-sm transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body text-foreground/80 text-base tracking-wide">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-muted/50 border-border font-body text-lg"
                        placeholder="Your name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body text-foreground/80 text-base tracking-wide">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="bg-muted/50 border-border font-body text-lg"
                        placeholder="your@email.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body text-foreground/80 text-base tracking-wide">Phone</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        className="bg-muted/50 border-border font-body text-lg"
                        placeholder="+91 98765 43210"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="attendees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body text-foreground/80 text-base tracking-wide">Number of Attendees</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min="1"
                        max="20"
                        className="bg-muted/50 border-border font-body text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full font-heading text-sm tracking-widest uppercase h-12 bg-primary text-primary-foreground hover:bg-gold-light transition-colors"
              >
                Register Now
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
