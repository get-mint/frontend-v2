export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-muted/5">
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-secondary">
            Terms and Conditions
          </h1>
          <p className="text-muted-foreground text-lg">
            These terms govern your use of Mint's services. By using our services, you agree to these terms.
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-background rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-secondary mb-4">Using Our Services</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              You must follow any policies made available to you within the services. Don't misuse our services.
            </p>
          </section>

          <section className="bg-background rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-secondary mb-4">Your Content in Our Services</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Some of our services allow you to upload, submit, store, send or receive content. You retain ownership of any intellectual property rights that you hold in that content.
            </p>
          </section>

          <section className="bg-background rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-secondary mb-4">Modifying and Terminating Our Services</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We are constantly changing and improving our services. We may add or remove functionalities or features, and we may suspend or stop a service altogether.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

