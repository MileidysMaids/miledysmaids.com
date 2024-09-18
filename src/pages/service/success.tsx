import React from "react";
import { motion } from "framer-motion";
import { CircleCheckIcon } from "@/icons/Icons";
import { LayoutClassNames } from "@/components/Layout";

export default function Component({ injectedClassNames }: LayoutClassNames) {
  const [progress, setProgress] = React.useState(100);

  const seconds = 10; // Use a prop or state for the countdown duration
  const redirectTime = 1000 * seconds; // Total time in milliseconds
  const intervalTime = 100; // Update every 100ms for smooth animation

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress - (intervalTime / redirectTime) * 100;
        return newProgress > 0 ? newProgress : 0;
      });
    }, intervalTime);

    const redirect = setTimeout(() => {
      window.location.href = "/"; // Redirect to a different page after countdown
    }, redirectTime);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [redirectTime, intervalTime]);

  return (
    <div className="background-svg bottom-oval flex flex-1 flex-col items-center justify-center py-40">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="rounded-lg border bg-white p-8 text-center shadow-2xl">
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <CircleCheckIcon className="mx-auto mb-4 h-24 w-24 text-green-500" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-2 text-3xl font-bold text-gray-800">
          Success!
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mb-6 text-gray-600">
          Your action has been completed successfully.
        </motion.p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-8 text-center text-white">
        <p className="text-lg">Thank you for using our service!</p>
        <p className="mt-2 text-sm">You will be redirected in {Math.ceil((progress / 100) * seconds)} seconds.</p>
        <div className="mt-4 h-2 w-64 overflow-hidden rounded-full bg-white/30">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "100%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
