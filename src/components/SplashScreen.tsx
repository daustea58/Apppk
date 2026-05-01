import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [logs, setLogs] = useState<string[]>([]);
  const messages = [
    "Initializing system...",
    "Connecting to secure server...",
    "Bypassing firewalls...",
    "Syncing neural patterns...",
    "Access granted."
  ];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < messages.length) {
        setLogs(prev => [...prev, messages[current]]);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex items-center justify-center z-50 font-mono">
      <div className="max-w-md w-full px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-[#00ff9f] mb-8 tracking-tighter text-center"
        >
          RYZEN HUB
        </motion.h1>
        
        <div className="space-y-2">
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[#00ff9f]/70 text-sm flex items-center"
            >
              <span className="mr-2">{">"}</span>
              {log}
              {i === logs.length - 1 && (
                <motion.span 
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="inline-block w-2 h-4 bg-[#00ff9f] ml-1"
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 h-0.5 bg-[#00ff9f]/20 overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "linear" }}
        >
          <motion.div 
            className="h-full bg-[#00ff9f]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "linear" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
