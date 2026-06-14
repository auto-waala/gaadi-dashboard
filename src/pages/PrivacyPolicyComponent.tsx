import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SEO } from "@/components/site/SEO";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Privacy Policy — AutoNext"
        description="Read AutoNext's privacy policy to understand how we collect, use, store and protect your personal data while you buy or sell vehicles on our platform."
        keywords={[
          "AutoNext privacy policy","data protection","user data privacy",
          "vehicle marketplace privacy","personal data security India",
        ]}
      />
      <Header />

      <main className="container py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

        <p className="text-muted-foreground mb-4">
          At AutoNext, we respect your privacy and are committed to protecting your personal data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
        <p className="text-muted-foreground">
          We collect your name, email, phone number, and usage data when you use our platform.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Data</h2>
        <p className="text-muted-foreground">
          We use your data to provide services, improve user experience, and communicate updates.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Data Security</h2>
        <p className="text-muted-foreground">
          We implement industry-standard security practices to protect your data.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;