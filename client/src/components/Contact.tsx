import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { SectionTitle } from "./AnimatedCard";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // FIXED MUTATION
  const createContact = useMutation({
    mutationFn: async () => {
      const cleanData = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      };

      return await apiRequest("POST", "/api/contacts", cleanData);
    },
    onSuccess: () => {
      toast.success("Message sent successfully! 🎉", {
        description: "I'll get back to you as soon as possible.",
      });
      setName("");
      setEmail("");
      setMessage("");
    },
    onError: () => {
      toast.error("Failed to send message", {
        description: "Please try again later.",
      });
    },
  });

  // FIXED HANDLER WITH VALIDATION
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("All fields are required!");
      return;
    }

    createContact.mutate();
  };

  // ICON DATA
  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: "nimmalaprashanth9@gmail.com",
      href: "mailto:nimmalaprashanth9@gmail.com",
      color: "from-primary to-primary/50",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 6300472707",
      href: "tel:+916300472707",
      color: "from-secondary to-secondary/50",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Warangal, India",
      href: null,
      color: "from-accent to-accent/50",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 relative" data-testid="section-contact">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's discuss your next project or idea"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card-hover p-8 space-y-6 relative"
            >
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-2">Send me a message</h4>
                <p className="text-sm text-muted-foreground">I'll respond as soon as possible</p>
              </div>

              {/* NAME */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Your Name
                </label>
                <Input
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-background/50 border-white/10 focus:border-primary"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Your Email
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50 border-white/10 focus:border-primary"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Your Message
                </label>
                <Textarea
                  placeholder="Tell me about your project or idea..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="bg-background/50 border-white/10 focus:border-primary resize-none"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                disabled={createContact.isPending}
                className="w-full bg-gradient-to-r from-primary to-secondary py-6 text-base font-medium"
              >
                {createContact.isPending ? "Sending..." : "Send Message"}
              </Button>

              {/* SUCCESS MESSAGE */}
              {createContact.isSuccess && (
                <div className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 mt-4">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
