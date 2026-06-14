import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { SEO } from "@/components/site/SEO";

const jobs = [
    {
        title: "Intern – Full Stack Developer (.NET / React)",
        exp: "Fresher / Internship (0–1 yrs)",
        salary: "₹15,000/month",
        date: "10 April 2026",
        location: "Hyderabad (In-office)",
    },
    {
        title: ".NET Full Stack Developer",
        exp: "3–7 Years",
        salary: "₹10L – ₹12L per year",
        date: "20 April 2026",
        location: "Remote",
    },
    {
        title: "Solution Architect – .NET Ecosystem",
        exp: "10–14 Years",
        salary: "₹12L – ₹16L per year",
        date: "20 April 2026",
        location: "Remote",
    },
    {
        title: "Project Manager",
        exp: "5–10 Years",
        salary: "₹14L – ₹24L per year",
        date: "20 April 2026",
        location: "Remote",
    },
    {
        title: "React.js Engineer",
        exp: "5–8 Years",
        salary: "₹12L – ₹20L per year",
        date: "22 April 2026",
        location: "Remote",
    },
    {
        title: "Angular Developer",
        exp: "5–8 Years",
        salary: "₹12L – ₹22L per year",
        date: "22 April 2026",
        location: "Remote",
    },
    {
        title: "Vue.js Developer",
        exp: "5–8 Years",
        salary: "₹12L – ₹22L per year",
        date: "22 April 2026",
        location: "Remote",
    },
    {
        title: "Azure Cloud Engineer",
        exp: "5–10 Years",
        salary: "₹15L – ₹24L per year",
        date: "25 April 2026",
        location: "Remote",
    },
    {
        title: "Backend Developer (Python / Node.js)",
        exp: "3–6 Years",
        salary: "₹8L – ₹14L per year",
        date: "25 April 2026",
        location: "Remote",
    },
    {
        title: "QA Engineer (Automation)",
        exp: "3–6 Years",
        salary: "₹7L – ₹12L per year",
        date: "26 April 2026",
        location: "Remote",
    },
];

const Careers = () => {
    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Careers at AutoNext — Join India's Fastest Growing Vehicle Marketplace"
                description="Explore 10+ open roles at AutoNext Hyderabad: .NET, React, Angular, Vue, Azure, QA, Project Manager and internships. Work on India's next-gen vehicle marketplace."
                keywords={[
                    "AutoNext careers","jobs at AutoNext","Hyderabad tech jobs",
                    ".NET developer jobs","React jobs India","Angular developer jobs",
                    "Vue.js jobs","Azure engineer jobs","QA automation jobs",
                    "project manager jobs","fresher internship Hyderabad","startup jobs India",
                ]}
            />
            <Header />

            <main className="container py-12 max-w-4xl">
                <h1 className="text-3xl font-bold mb-4 text-center">Careers at AutoNext</h1>

                <p className="text-muted-foreground text-center mb-10">
                    Join our Hyderabad-based startup and help us build India’s next-generation
                    vehicle marketplace platform.
                </p>

                <div className="space-y-4">
                    {jobs.map((job, index) => (
                        <div
                            key={index}
                            className="border rounded-xl p-4 bg-card hover:shadow-md transition"
                        >
                            <h2 className="text-lg font-semibold">{job.title}</h2>

                            <div className="text-sm text-muted-foreground mt-1">
                                📅 {job.date} • 💼 {job.exp} • 💰 {job.salary} • 📍 {job.location}
                            </div>

                            <p className="text-sm mt-2 text-muted-foreground">
                                We are looking for passionate professionals to join our team and
                                contribute to building scalable and modern applications at AutoNext.
                            </p>

                            <button className="mt-3 text-primary text-sm font-medium hover:underline">
                                Apply Now →
                            </button>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Careers;