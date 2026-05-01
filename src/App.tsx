/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import MainDashboard from "./components/MainDashboard";
import PinLock from "./components/PinLock";

export default function App() {
  const [step, setStep] = useState<"splash" | "pin" | "dashboard">("splash");

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#00ff9f] selection:text-[#0a0a0a] font-mono overflow-hidden">
      {step === "splash" && (
        <SplashScreen onComplete={() => setStep("pin")} />
      )}
      {step === "pin" && (
        <PinLock onUnlocked={() => setStep("dashboard")} />
      )}
      {step === "dashboard" && (
        <MainDashboard />
      )}
    </main>
  );
}
