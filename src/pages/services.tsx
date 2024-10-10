import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Home, Building2, Briefcase, Truck, Calendar, Clock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: <Home className="h-6 w-6" />,
    title: "Residential Cleaning",
    description: "Keep your home spotless with our thorough residential cleaning services.",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Commercial Cleaning",
    description: "Maintain a clean and professional environment for your business.",
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Office Cleaning",
    description: "Ensure a hygienic workspace for your employees and clients.",
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Move-in/Move-out Cleaning",
    description: "Start fresh in your new space or leave your old one spotless.",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Recurring Cleaning",
    description: "Schedule regular cleaning sessions to maintain cleanliness.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "One-time Deep Cleaning",
    description: "Get a thorough, one-time deep clean for those special occasions.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    content: "CleanCo has transformed my home. Their attention to detail is unmatched!",
  },
  {
    name: "Michael Chen",
    role: "Office Manager",
    content: "Our office has never been cleaner. The team is professional and efficient.",
  },
  {
    name: "Emily Rodriguez",
    role: "Restaurant Owner",
    content: "CleanCo's commercial cleaning services have elevated our restaurant's hygiene standards.",
  },
];

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

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="background-svg min-h-screen">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative flex h-[50vh] items-center justify-center bg-cover bg-center">
        <div className="absolute inset-0"></div>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mb-4 text-5xl font-bold text-white">
            Professional Cleaning Services
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8 text-xl text-white">
            Experience the difference with CleanCo
          </motion.p>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
            <Button size="lg" className="rounded-full bg-blue-500 px-8 py-3 font-semibold text-white hover:bg-blue-600">
              Get a Quote
            </Button>
          </motion.div>
        </div>
      </motion.section>

      <main className="mx-auto flex max-w-7xl flex-col gap-36 px-4 py-12 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Our Cleaning Services
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="overflow-hidden rounded-lg bg-white shadow-lg">
              <div className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">{service.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="mt-24">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="rounded-lg bg-white p-6 shadow-md">
                <p className="mb-4 text-gray-600">"{testimonial.content}"</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.7 }} className="mt-24">
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mb-16 text-center text-3xl font-bold text-gray-900">
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
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-24 rounded-xl bg-secondary p-8 text-center text-white">
          <h2 className="mb-4 text-3xl font-bold">Ready for a Cleaner Space?</h2>
          <p className="mb-8 text-xl">Let us take care of the cleaning while you focus on what matters most.</p>
          <a href="/service/booking" className="btn btn-outline btn-primary">
            Schedule a Cleaning
          </a>
        </motion.section>
      </main>
    </div>
  );
}
