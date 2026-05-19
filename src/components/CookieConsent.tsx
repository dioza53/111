import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, Check } from 'lucide-react';

export const CookieConsent = ({ onOpenSettings }: { onOpenSettings: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lumibrace_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('lumibrace_cookie_consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className="fixed bottom-4 right-4 z-[150] w-[280px]"
        >
          <div className="bg-charcoal/95 backdrop-blur-xl border border-pearl/10 rounded-2xl p-4 shadow-2xl">
            <div className="flex gap-3 items-center mb-3">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0">
                <Cookie className="w-4 h-4" />
              </div>
              <p className="text-[10px] text-pearl/80 leading-tight">
                האתר משתמש בעוגיות כדי להעניק לך חוויה טובה יותר.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 bg-gold text-charcoal py-2 rounded-lg text-[10px] font-black hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                אישור
              </button>
              <button
                onClick={onOpenSettings}
                className="px-3 bg-pearl/5 text-pearl/40 py-2 rounded-lg text-[10px] font-bold hover:bg-pearl/10 transition-all"
              >
                הגדרות
              </button>
            </div>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-2 left-2 p-1 text-pearl/10 hover:text-pearl/40 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
