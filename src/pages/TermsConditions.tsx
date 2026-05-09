import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const Terms = () => {
    return (
        <div className="min-h-screen bg-background">
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