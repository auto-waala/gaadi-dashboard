import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SEO } from "@/components/site/SEO";

const Terms = () => {
    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Terms & Conditions — AutoNext"
                description="Review AutoNext's terms and conditions for using our vehicle marketplace — usage rules, account responsibilities, listings and limitation of liability."
                keywords={[
                    "AutoNext terms","terms and conditions","vehicle marketplace terms",
                    "user agreement","platform usage policy",
                ]}
            />
            <Header />

            <main className="container py-12 max-w-3xl">
                <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>

                <p className="text-muted-foreground mb-4">
                    By using AutoNext, you agree to the following terms and conditions.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Usage</h2>
                <p className="text-muted-foreground">
                    You agree to use the platform only for lawful purposes.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Accounts</h2>
                <p className="text-muted-foreground">
                    You are responsible for maintaining the confidentiality of your account.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
                <p className="text-muted-foreground">
                    AutoNext is not liable for any damages resulting from platform usage.
                </p>
            </main>
            <Footer />
        </div>
    );
};

export default Terms;