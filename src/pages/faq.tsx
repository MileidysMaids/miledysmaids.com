import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What cleaning products do you use?",
    answer: "We use eco-friendly, non-toxic cleaning products that are safe for your family and pets.",
  },
  {
    question: "How often should I schedule a cleaning service?",
    answer: "It depends on your needs. We offer weekly, bi-weekly, and monthly services, as well as one-time deep cleans.",
  },
  {
    question: "Are your cleaning staff insured and bonded?",
    answer: "Yes, all our cleaning professionals are fully insured and bonded for your peace of mind.",
  },
  {
    question: "Do I need to be home during the cleaning service?",
    answer: "It's not necessary. Many of our clients provide a key or access code. We ensure the security of your property.",
  },
];

export default function AnimatedFAQPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="container mx-auto flex w-full flex-1 px-4 py-12">
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-24 w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mb-28 text-center text-3xl font-bold text-gray-900">
          Frequently Asked Questions
        </motion.h2>
        <motion.div
          className="space-y-4"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="show">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <motion.button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="flex w-full items-center justify-between p-4 text-left"
                whileHover={{ backgroundColor: "#f3f4f6" }}
                transition={{ duration: 0.2 }}>
                <span className="font-medium text-gray-900">{faq.question}</span>
                <motion.div animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-gray-50">
                    <motion.p
                      className="p-4 text-gray-600"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.3 }}>
                      {faq.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
}
