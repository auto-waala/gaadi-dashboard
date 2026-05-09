import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

const pressReleases = [
  {
    title: "AutoNext Launches India’s Next-Gen Vehicle Marketplace Platform",
    date: "April 2026",
    location: "Hyderabad, India",
    content:
      "AutoNext announced the launch of its digital platform connecting buyers and dealers for cars, bikes, trucks, and bicycles across India. The platform enables direct dealer interaction and real-world vehicle inspection to ensure transparency and trust.",
  },
  {
    title: "AutoNext Introduces Vehicle Financing Solutions with Leading Banks",
    date: "May 2026",
    location: "Hyderabad, India",
    content:
      "AutoNext launched integrated financing solutions allowing users to compare loan options, view EMI plans, and apply for car, bike, and truck loans with minimal documentation.",
  },
  {
    title: "AutoNext Launches ‘Latest Arrivals’ Feature",
    date: "May 2026",
    location: "Hyderabad, India",
    content:
      "The new feature provides real-time updates on newly listed vehicles, helping customers discover the latest cars, bikes, and trucks from dealers.",
  },
  {
    title: "AutoNext Expands Dealer Network Across India",
    date: "June 2026",
    location: "Hyderabad, India",
    content:
      "AutoNext expanded its dealer network across major cities, improving vehicle availability and strengthening its marketplace ecosystem.",
  },
  {
    title: "AutoNext Enhances Platform with Cloud & Microservices",
    date: "June 2026",
    location: "Hyderabad, India",
    content:
      "The platform now uses modern cloud and microservices architecture to improve scalability, performance, and security.",
  },
  {
    title: "AutoNext Emerges as Hyderabad-Based Automotive Startup",
    date: "April 2026",
    location: "Hyderabad, India",
    content:
      "AutoNext focuses on connecting buyers and sellers through a transparent, dealer-driven marketplace model.",
  },
  {
    title: "AutoNext Plans Expansion into Insurance & EV Marketplace",
    date: "July 2026",
    location: "Hyderabad, India",
    content:
      "Upcoming features include vehicle insurance, EV listings, and AI-based recommendations to enhance the platform experience.",
  },
  {
    title: "AutoNext Reaches 10,000 Users Milestone",
    date: "July 2026",
    location: "Hyderabad, India",
    content:
      "The platform crossed its first 10,000 users, showing strong growth in India’s vehicle marketplace segment.",
  },
  {
    title: "AutoNext Partners with Financial Institutions",
    date: "August 2026",
    location: "Hyderabad, India",
    content:
      "Partnerships with banks and NBFCs enable faster loan approvals and better financing options for customers.",
  },
  {
    title: "AutoNext Aims to Become India’s Trusted Vehicle Marketplace",
    date: "2026",
    location: "Hyderabad, India",
    content:
      "AutoNext is focused on building a transparent, scalable platform that improves customer experience and empowers dealers.",
  },
];

const Press = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Press Releases
        </h1>

        <p className="text-center text-muted-foreground mb-10">
          Stay updated with the latest announcements, product updates, and milestones from AutoNext.
        </p>

        <div className="space-y-6">
          {pressReleases.map((press, index) => (
            <div
              key={index}
              className="border rounded-xl p-5 bg-card hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {press.title}
              </h2>

              <p className="text-xs text-muted-foreground mb-3">
                {press.location} • {press.date}
              </p>

              <p className="text-sm text-muted-foreground">
                {press.content}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Press;