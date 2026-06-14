import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEO } from "@/components/site/SEO";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, phone, subject, message });
    alert("Message sent! Our team will get back to you within 24 hours.");
    setName(""); setEmail(""); setPhone(""); setSubject(""); setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact AutoNext — Get in Touch with India's Trusted Vehicle Marketplace"
        description="Contact AutoNext for support, dealer queries, partnerships, or feedback. Visit our Hyderabad office, call us, or send a message — we respond within 24 hours."
        keywords={[
          "contact AutoNext","AutoNext support","AutoNext Hyderabad office",
          "car marketplace contact","dealer partnership","vehicle marketplace help",
          "AutoNext customer care","sell car India contact","buy car India support",
        ]}
      />
      <Header />

      <main className="container py-12">
        <div className="mx-auto max-w-5xl">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
            <p className="text-muted-foreground mt-2">
              We'd love to hear from you. Reach out for support, partnerships, or feedback.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Info + Map */}
            <div className="space-y-4">
              <div className="bg-card border rounded-2xl p-6 shadow-card">
                <h2 className="text-xl font-semibold mb-4">Our Office</h2>
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>
                      Betalen Technologies Pvt. Ltd.<br />
                      4th Floor, Cyber Towers, HITEC City,<br />
                      Madhapur, Hyderabad — 500081, Telangana, India
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <a href="tel:+914049000000" className="hover:text-primary">
                      +91 40 4900 0000
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <a href="mailto:support@autonext.in" className="hover:text-primary">
                      support@autonext.in
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>Mon – Sat: 9:30 AM – 7:00 PM IST</span>
                  </li>
                </ul>
              </div>

              <div className="overflow-hidden rounded-2xl border shadow-card">
                <iframe
                  title="AutoNext Hyderabad Office Location"
                  src="https://www.google.com/maps?q=Cyber+Towers+Hitec+City+Hyderabad&output=embed"
                  width="100%"
                  height="280"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0 w-full"
                />
              </div>
            </div>

            {/* Form */}
            <div className="bg-card border rounded-2xl p-6 shadow-card">
              <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
              <form onSubmit={submit} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label>Name</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={15} />
                  </div>
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} />
                </div>
                <div>
                  <Label>Subject</Label>
                  <Input value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={150} />
                </div>
                <div>
                  <Label>Message</Label>
                  <textarea
                    className="w-full border rounded-md p-2 bg-background"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    maxLength={1000}
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
