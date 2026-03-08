export default function FooterSection() {
  return (
    <footer className="py-16 px-6 border-t border-border/50">
      <div className="container mx-auto max-w-4xl text-center">
        <h3 className="font-heading text-2xl text-primary mb-4">BrajRas</h3>
        <p className="font-body text-muted-foreground text-lg mb-8 italic">
          The Mellows of Śrī Vṛndāvan Dhām
        </p>
        <div className="ornament-divider max-w-xs mx-auto mb-8">
          <span className="text-primary/40 text-sm">✦</span>
        </div>
        <p className="font-body text-muted-foreground text-sm">
          © 2026 BrajRas. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
