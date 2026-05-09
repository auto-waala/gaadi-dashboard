import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ name, email, message });

    alert("Message sent!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-12 flex justify-center">
        <div className="w-full max-w-md bg-card p-6 rounded-2xl border shadow-card">
          <h1 className="text-2xl font-bold mb-4 text-center">Contact Us</h1>

          <form onSubmit={submit} className="space-y-3">
            <div>
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <Label>Email</Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <Label>Message</Label>
              <textarea
                className="w-full border rounded-md p-2 bg-background"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;