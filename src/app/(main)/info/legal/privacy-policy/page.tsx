export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-muted/5">
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-secondary">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg">
            Your privacy is important to us. This policy explains how we handle your personal information.
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-background rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-secondary mb-4">Information We Collect</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We collect information to provide better services to our users. This includes information you provide to us and information we collect automatically.
            </p>
          </section>

          <section className="bg-background rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-secondary mb-4">How We Use Information</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We use the information we collect to maintain and improve our services, develop new services, and protect Mint and our users.
            </p>
          </section>

          <section className="bg-background rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-secondary mb-4">Information Sharing</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We do not share personal information with companies, organizations, or individuals outside of Mint unless one of the following circumstances applies.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
