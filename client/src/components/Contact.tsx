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

  const createContact = useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      await apiRequest("POST", "/api/contacts", data);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createContact.mutate({ name, email, message });
  };

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="contact" className="py-20 px-4 relative" data-testid="section-contact">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's discuss your next project or idea"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-2 gradient-text">Let's Talk</h3>
                <p className="text-muted-foreground">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
              </div>

              {contactItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href || "#"}
                  onClick={(e) => !item.href && e.preventDefault()}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 glass-card-hover p-6 group cursor-pointer relative"
                >
                  {/* Icon Background */}
                  <motion.div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:shadow-2xl transition-all`}
                    whileHover={{ rotate: 20, scale: 1.1 }}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 group-hover:text-primary transition-colors">
                    <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                      {item.label}
                    </p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>

                  {/* Arrow */}
                  <motion.div
                    className="text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass-card-hover p-8 space-y-6 relative"
              data-testid="form-contact"
            >
              {/* Form Title */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-2">Send me a message</h4>
                <p className="text-sm text-muted-foreground">I'll respond as soon as possible</p>
              </div>

              {/* Name Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Your Name
                </label>
                <Input
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-background/50 border-white/10 focus:border-primary transition-colors"
                  data-testid="input-name"
                />
              </motion.div>

              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Your Email
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50 border-white/10 focus:border-primary transition-colors"
                  data-testid="input-email"
                />
              </motion.div>

              {/* Message Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Your Message
                </label>
                <Textarea
                  placeholder="Tell me about your project or idea..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className="bg-background/50 border-white/10 focus:border-primary transition-colors resize-none"
                  data-testid="input-message"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={createContact.isPending}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity glow-pulse py-6 text-base font-medium"
                  data-testid="button-submit"
                >
                  <span className="flex items-center justify-center gap-2">
                    {createContact.isPending ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          ⏳
                        </motion.div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </span>
                </Button>
              </motion.div>

              {/* Success Message */}
              {createContact.isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
