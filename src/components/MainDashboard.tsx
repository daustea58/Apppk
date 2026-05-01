import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Hash, 
  Clock, 
  Shield, 
  Wifi, 
  RefreshCcw, 
  ArrowLeft,
  ChevronRight
} from "lucide-react";

interface SocialPlatform {
  id: string;
  name: string;
  url: string;
  icon: any;
  color: string;
}

const platforms: SocialPlatform[] = [
  { id: 'whatsapp', name: 'WhatsApp', url: 'https://web.whatsapp.com', icon: MessageCircle, color: '#25D366' },
  { id: 'instagram', name: 'Instagram', url: 'https://www.instagram.com', icon: Instagram, color: '#E4405F' },
  { id: 'facebook', name: 'Facebook', url: 'https://www.facebook.com', icon: Facebook, color: '#1877F2' },
  { id: 'threads', name: 'Threads', url: 'https://www.threads.net', icon: Hash, color: '#FFFFFF' },
];

export default function MainDashboard() {
  const [activePlatform, setActivePlatform] = useState<SocialPlatform | null>(null);
  const [time, setTime] = useState(new Date());
  const [isInjecting, setIsInjecting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Background logs simulation
  useEffect(() => {
    const logInterval = setInterval(() => {
      const symbols = ["SYNC", "LOAD", "AUTH", "PUSH", "PING"];
      const newLog = `[${symbols[Math.floor(Math.random() * symbols.length)]}] ${Math.random().toString(36).substring(7).toUpperCase()}... OK`;
      setLogs(prev => [newLog, ...prev.slice(0, 5)]);
    }, 2000);
    return () => clearInterval(logInterval);
  }, []);

  const handlePlatformClick = (platform: SocialPlatform) => {
    setIsInjecting(true);
    setActivePlatform(platform);
    
    // Simulate "Injecting session..."
    setTimeout(() => {
      setIsInjecting(false);
      // Since it's a web preview, we open in new tab if we can't iframe
      // But we will show a UI that LOOKS like a browser.
      // Note: Re-enabling this in real world requires careful security headers if iframing
      // For this demo, we'll "redirect" or show a placeholder that explains the security.
    }, 2500);
  };

  const handleBack = () => {
    setActivePlatform(null);
  };

  return (
    <div className="relative h-screen w-full flex flex-col pt-safe pb-safe overflow-hidden bg-[#0a0a0a]">
      {/* Scanning Line Animation */}
      <motion.div 
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-[#00ff9f]/20 z-10 pointer-events-none shadow-[0_0_15px_rgba(0,255,159,0.5)]"
      />

      {/* Background Logs */}
      <div className="absolute top-20 right-4 opacity-10 pointer-events-none select-none text-[10px] space-y-1">
        {logs.map((log, i) => (
          <div key={i} className="text-[#00ff9f]">{log}</div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!activePlatform ? (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col p-6 z-20"
          >
            {/* Header */}
            <header className="flex justify-between items-start mb-8 border-b border-[#00ff9f]/20 pb-4">
              <div>
                <motion.h2 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[#00ff9f] text-[10px] font-bold tracking-[0.2em]"
                >
                  [ STATUS: CONNECTED ]
                </motion.h2>
                <h1 className="text-2xl font-bold text-white mt-1 glitch" data-text="RYZEN DASHBOARD">RYZEN DASHBOARD</h1>
                <p className="text-[#00ff9f]/50 text-xs mt-1">SEC_LEVEL: ALPHA-7</p>
              </div>
              <div className="text-right">
                <div className="text-[#00ff9f] font-bold text-xl leading-none">
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                </div>
                <div className="text-[10px] text-[#00ff9f]/50 mt-1">USER: RYZEN_ADMIN</div>
              </div>
            </header>

            {/* Platform Grid */}
            <div className="grid grid-cols-2 gap-4 flex-1 content-start">
              {platforms.map((p) => (
                <motion.button
                  key={p.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePlatformClick(p)}
                  className="relative group h-40 border border-[#00ff9f]/20 bg-[#0a0a0a]/50 flex flex-col items-center justify-center gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00ff9f]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ff9f]/40" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ff9f]/40" />
                  
                  <p.icon className="w-10 h-10 text-white" />
                  <span className="text-xs font-bold tracking-widest text-[#00ff9f] group-hover:text-white transition-colors">
                    {p.name.toUpperCase()}
                  </span>
                  
                  <div className="absolute bottom-2 left-2 right-2 h-0.5 bg-[#00ff9f]/10">
                    <div className="h-full bg-[#00ff9f]/30 w-1/3" />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Bottom Nav Stats */}
            <div className="mt-8 grid grid-cols-3 gap-2 py-4 border-t border-[#00ff9f]/20">
              <div className="flex flex-col items-center gap-1">
                <Shield className="w-4 h-4 text-[#00ff9f]" />
                <span className="text-[8px] text-[#00ff9f]/50">FIREWALL: ACTIVE</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-x border-[#00ff9f]/10">
                <Wifi className="w-4 h-4 text-[#00ff9f]" />
                <span className="text-[8px] text-[#00ff9f]/50">LINK: STABLE</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCcw className="w-4 h-4 text-[#00ff9f]" />
                <span className="text-[8px] text-[#00ff9f]/50">LATENCY: 14MS</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="webview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col bg-[#0a0a0a] z-30"
          >
            {/* WebView Header */}
            <div className="p-4 border-b border-[#00ff9f]/20 flex items-center justify-between">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 text-[#00ff9f] hover:text-white transition-colors"
                id="back-btn"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-xs font-bold">TERMINATE LINK</span>
              </button>
              <div className="text-center">
                <p className="text-[10px] text-[#00ff9f]/50 uppercase tracking-widest">Active Stream</p>
                <div className="text-xs font-bold">{activePlatform.url}</div>
              </div>
              <div className="flex gap-4">
                <RefreshCcw className="w-4 h-4 text-[#00ff9f] cursor-pointer" />
              </div>
            </div>

            {/* Loading / Content */}
            <div className="flex-1 relative overflow-hidden bg-black flex flex-col">
              {isInjecting ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0a0a0a]">
                  <div className="text-center space-y-6 max-w-xs transition-all">
                    <div className="flex justify-center mb-8">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-2 border-[#00ff9f] border-t-transparent rounded-full shadow-[0_0_15px_rgba(0,255,159,0.3)]"
                      />
                    </div>
                    
                    <div className="space-y-4 font-mono">
                      <LoadingText messages={[
                        "Establishing secure tunnel...",
                        "Bypassing firewall...",
                        "Injecting session...",
                        "Handshaking node...",
                        "Link established."
                      ]} />
                    </div>

                    <div className="w-full h-1 bg-[#00ff9f]/10 overflow-hidden relative">
                      <motion.div 
                        className="h-full bg-[#00ff9f]"
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col bg-black">
                  <div className="h-1 bg-[#00ff9f]/20 w-full" />
                  
                  <div className="flex-1 relative flex flex-col items-center justify-center">
                    {/* Simulated Console for Connection Issue */}
                    <div className="absolute inset-0 z-10 p-6 flex flex-col items-center justify-center text-center bg-[#0a0a0a]/90 backdrop-blur-sm transition-opacity duration-500">
                      <div className="max-w-md p-8 border border-[#00ff9f]/30 bg-black relative">
                        {/* Glitch Corners */}
                        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#00ff9f]" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#00ff9f]" />
                        
                        <Shield className="w-16 h-16 text-[#00ff9f] mx-auto mb-6 animate-pulse" />
                        
                        <h3 className="text-[#00ff9f] font-bold text-lg mb-4 glitch" data-text="NEURAL LINK BLOCKED">NEURAL LINK BLOCKED</h3>
                        
                        <div className="text-[11px] text-white/70 space-y-3 font-mono text-left mb-8 border-l-2 border-[#00ff9f]/20 pl-4">
                          <p className="text-[#00ff9f]">[ SYSTEM LOG ]:</p>
                          <p>{activePlatform.name} security protocol detected.</p>
                          <p className="text-red-400">ERROR: X-Frame-Options: SAMEORIGIN</p>
                          <p>Status: Browser-in-browser tunnel restricted.</p>
                          <p className="text-[#00ff9f]/60 italic font-bold">INFO: Di aplikasi Android (APK), proteksi ini akan terlewati otomatis melalui Native WebView.</p>
                        </div>

                        <motion.a
                          href={activePlatform.url}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0,255,159,0.5)" }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-4 bg-[#00ff9f] text-[#0a0a0a] font-bold text-xs tracking-[0.2em] flex items-center justify-center gap-2"
                        >
                          OPEN SECURE EXTERNAL LINK
                          <ChevronRight className="w-4 h-4" />
                        </motion.a>
                        
                        <p className="mt-4 text-[9px] text-[#00ff9f]/40 uppercase tracking-widest">Manual bypass optimization required</p>
                      </div>
                    </div>

                    {/* Hidden WebView in background to maintain structure */}
                    <iframe 
                      src={activePlatform.url} 
                      className="w-full h-full border-none opacity-10"
                      title={activePlatform.name}
                      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Webview Bottom Bar */}
            <div className="p-4 bg-[#050505] border-t border-[#00ff9f]/10 flex justify-center gap-8">
               {platforms.map(p => (
                 <button 
                  key={p.id}
                  onClick={() => handlePlatformClick(p)}
                   className={`p-2 rounded-lg transition-all ${activePlatform.id === p.id ? 'bg-[#00ff9f]/20 text-[#00ff9f]' : 'text-gray-600 hover:text-white'}`}
                 >
                   <p.icon className="w-5 h-5" />
                 </button>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Global Footer (Visible on Dash) */}
      {!activePlatform && (
        <div className="p-4 flex justify-around border-t border-[#00ff9f]/10 bg-[#050505]">
           {platforms.map(p => (
             <button 
              key={p.id}
              onClick={() => handlePlatformClick(p)}
               className="p-2 text-gray-500 hover:text-[#00ff9f] transition-colors"
               id={`nav-${p.id}`}
             >
               <p.icon className="w-6 h-6" />
             </button>
           ))}
        </div>
      )}
    </div>
  );
}

function LoadingText({ messages }: { messages: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 450);
    return () => clearInterval(timer);
  }, [messages]);

  return (
    <div className="h-6">
      <motion.p 
        key={index}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[#00ff9f] text-[10px] tracking-widest"
      >
        {messages[index]}
      </motion.p>
    </div>
  )
}
