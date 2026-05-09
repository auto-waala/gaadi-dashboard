import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
const Cookies = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container py-12 max-w-3xl">
                <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>

                <p className="text-muted-foreground mb-4">
                    We use cookies to enhance your experience on AutoNext.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">What Are Cookies?</h2>
                <p className="text-muted-foreground">
                    Cookies are small files stored on your device to improve functionality.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Cookies</h2>
                <p className="text-muted-foreground">
                    We use cookies for authentication, analytics, and preferences.
                </p>
            </main>
            
            <Footer />
        </div>
    );
};

export default Cookies;