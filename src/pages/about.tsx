import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail } from "lucide-react";

export default function AboutPage() {
  const company_name = "Mileidy's Maids";

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    // transition: { duration: 0.6 },
  };

  const slideIn = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    // transition: { duration: 0.6 },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="background-svg min-h-screen">
      <motion.section className="container mx-auto mt-32 px-4 py-16 text-center" initial="initial" animate="animate" variants={fadeIn}>
        <h1 className="mb-4 text-4xl font-bold">About {company_name}</h1>
        <p className="text-xl text-gray-600">Your Trusted Cleaning Partner</p>
      </motion.section>

      <motion.section className="container mx-auto px-4 py-16" initial="initial" animate="animate" variants={slideIn}>
        <h2 className="mb-6 text-3xl font-semibold">Our Mission</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          At {company_name}, we're committed to providing top-notch cleaning services that transform your space and elevate your lifestyle.
          Our dedicated team of professionals ensures that every nook and cranny shines, giving you peace of mind and a spotless
          environment.
        </p>
      </motion.section>

      <motion.section className="container mx-auto px-4 py-16" variants={stagger} initial="initial" animate="animate">
        <h2 className="mb-6 text-3xl font-semibold">Why Choose Us</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            "Experienced and vetted cleaning professionals",
            "Eco-friendly cleaning products and methods",
            "Customized cleaning plans to fit your needs",
            "100% satisfaction guarantee",
          ].map((item, index) => (
            <motion.div key={index} className="flex items-start space-x-3" variants={fadeIn}>
              <CheckCircle className="mt-1 text-green-500" />
              <p className="text-lg text-gray-700">{item}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-6 text-3xl font-semibold">Meet Our Team</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { name: "Jane Doe", role: "Founder & CEO" },
            { name: "John Smith", role: "Operations Manager" },
            { name: "Emily Brown", role: "Customer Relations" },
          ].map((member, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gray-200" />
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        className="container mx-auto px-4 py-16 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <h2 className="mb-6 text-3xl font-semibold">Ready for a Cleaner Space?</h2>
        <Button size="lg" className="bg-blue-500 text-white hover:bg-blue-600">
          <Mail className="mr-2 h-4 w-4" /> Contact Us Today
        </Button>
      </motion.section>
    </div>
  );
}
