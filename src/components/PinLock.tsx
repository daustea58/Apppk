import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Lock } from "lucide-react";

export default function PinLock({ onUnlocked }: { onUnlocked: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const correctPin = "1337";

  const handleInput = (val: string) => {
    if (pin.length < 4) {
      const newPin = pin + val;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === correctPin) {
          setTimeout(onUnlocked, 500);
        } else {
          setError(true);
          setTimeout(() => {
            setPin("");
            setError(false);
          }, 1000);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center z-40 font-mono">
      <motion.div 
        animate={error ? { x: [-10, 10, -10, 10, 0], filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"] } : {}}
        className={`text-center ${error ? 'glitch' : ''}`}
        data-text="ACCESS DENIED"
      >
        <Lock className={`w-8 h-8 mx-auto mb-4 ${error ? 'text-red-500' : 'text-[#00ff9f]'}`} />
        <h2 className={`text-xs tracking-[0.3em] font-bold mb-8 ${error ? 'text-red-500' : 'text-[#00ff9f]/50'}`}>
          {error ? "[ ACCESS DENIED ]" : "[ ENTER SECURITY PIN ]"}
        </h2>

        <div className="flex gap-4 mb-12">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i}
              className={`w-3 h-3 rounded-full border border-[#00ff9f] ${pin.length > i ? 'bg-[#00ff9f]' : 'bg-transparent'} ${error ? 'border-red-500 bg-red-500' : ''}`}
            />
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button 
              key={num}
              onClick={() => handleInput(num.toString())}
              className="w-12 h-12 flex items-center justify-center text-xl text-[#00ff9f] border border-[#00ff9f]/20 hover:bg-[#00ff9f]/10 active:scale-95 transition-all"
            >
              {num}
            </button>
          ))}
          <div />
          <button 
            onClick={() => handleInput("0")}
            className="w-12 h-12 flex items-center justify-center text-xl text-[#00ff9f] border border-[#00ff9f]/20 hover:bg-[#00ff9f]/10 active:scale-95 transition-all"
          >
            0
          </button>
          <div />
        </div>

        <p className="mt-8 text-[10px] text-[#00ff9f]/30 italic">Hint: Leet code</p>
      </motion.div>
    </div>
  );
}
