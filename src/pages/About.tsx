import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container py-12 max-w-4xl">
                <h1 className="text-3xl font-bold mb-4">About AutoNext</h1>

                <p className="text-muted-foreground mb-4">
                    AutoNext is a Hyderabad-based Indian startup building a smart and reliable platform
                    for buying and selling vehicles across India. We connect customers and dealers for
                    cars, bikes, trucks, and bicycles—covering both new and pre-owned vehicles.
                </p>

                <p className="text-muted-foreground mb-4">
                    Our goal is to simplify the vehicle discovery journey while keeping trust and transparency
                    at the center. AutoNext allows customers to explore a wide range of vehicles from different
                    brands and models, and connect directly with sellers for real-world inspection and purchase.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Vehicle Marketplace</h2>
                <p className="text-muted-foreground">
                    AutoNext provides a powerful marketplace where sellers can list their vehicles and buyers
                    can easily browse through thousands of options. From budget bikes to premium cars and
                    commercial trucks, we cover multiple segments to suit every need.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Latest Arrivals & Smart Discovery</h2>
                <p className="text-muted-foreground">
                    Stay updated with newly arrived vehicles from trusted dealers. Our platform highlights
                    the latest listings, trending models, and popular brands so customers never miss the
                    best deals in the market.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Dealer Connect & Lead Generation</h2>
                <p className="text-muted-foreground">
                    AutoNext bridges the gap between buyers and dealers by generating high-quality leads.
                    Customers can directly connect with nearby dealers, visit their location, and inspect
                    vehicles before making a purchase decision—ensuring trust and confidence.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Vehicle Financing & Loans</h2>
                <p className="text-muted-foreground">
                    We simplify financing by helping customers access car loans, bike loans, and truck loans
                    from multiple banks and financial institutions. AutoNext enables users to compare loan
                    options, interest rates, and EMI plans, making it easier to choose the best financing solution.
                </p>

                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    <li>Car loans from leading banks and NBFCs</li>
                    <li>Bike financing with flexible EMI options</li>
                    <li>Commercial vehicle (truck) loan support</li>
                    <li>Easy documentation and faster approvals</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">Why Choose AutoNext</h2>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    <li>Wide range of new and used vehicles</li>
                    <li>Direct dealer interaction for better trust</li>
                    <li>Latest arrivals and real-time listings</li>
                    <li>Loan assistance from multiple providers</li>
                    <li>Built specifically for Indian market needs</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">Our Mission</h2>
                <p className="text-muted-foreground">
                    Our mission is to make vehicle buying and selling simple, transparent, and accessible
                    for everyone by combining technology with real-world dealer experiences.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">Our Vision</h2>
                <p className="text-muted-foreground">
                    We aim to become one of India’s most trusted automotive platforms by empowering dealers,
                    improving customer experience, and bringing innovation to the vehicle marketplace ecosystem.
                </p>
            </main>
            <Footer />
        </div>
    );
};

export default AboutUs;