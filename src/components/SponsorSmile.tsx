import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SponsorSmile = () => {
  const [donorName, setDonorName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from("sponsors")
        .insert([
          {
            donor_name: donorName,
            message: message,
            amount: amount ? parseFloat(amount) : null,
          },
        ]);

      if (error) throw error;

      toast.success("Thank you for your kindness! 💝", {
        description: "Your sponsorship means the world to these children.",
      });

      setDonorName("");
      setMessage("");
      setAmount("");
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-20 px-4 bg-muted/20 relative overflow-hidden">
      {/* Animated Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
            }}
            animate={{
              y: -100,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          >
            <Heart className="w-6 h-6 text-primary/20" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block mb-6"
          >
            <Heart className="w-16 h-16 text-primary mx-auto" fill="currentColor" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Sponsor a Smile 😊
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            I believe in giving back to society. Through this initiative, I help poor and parentless children 
            by providing them with education, food, and a brighter future. Your contribution can make a real difference.
          </p>

          <motion.div
            className="glass-card p-8 mb-8 max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-semibold mb-4">How Your Help Makes an Impact</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">📚</div>
                <p className="text-sm text-muted-foreground">Education & Books</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">🍽️</div>
                <p className="text-sm text-muted-foreground">Food & Nutrition</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">🏠</div>
                <p className="text-sm text-muted-foreground">Shelter & Care</p>
              </div>
            </div>
          </motion.div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-lg px-8 py-6 glow-primary"
              >
                <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                Sponsor Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="gradient-text">Make a Difference Today</DialogTitle>
                <DialogDescription>
                  Every contribution, big or small, brings a smile to a child's face.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    placeholder="Amount (Optional)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message (Optional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary">
                  Submit
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorSmile;