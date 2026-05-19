import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X } from 'lucide-react';

const buyers = ['דנה', 'רון', 'מיכל', 'עידן', 'שיר', 'עומר', 'נועה', 'תומר', 'יעל', 'אביב'];
const cities = ['מתל אביב', 'מחיפה', 'מירושלים', 'מראשון לציון', 'מפתח תקווה', 'מבאר שבע', 'מהרצליה', 'מאילת', 'מנתניה'];
const products = ['צמיד זוגי (הכי פופולרי)', 'צמיד בודד', 'מארז יוקרתי', 'צמיד כסף', 'צמיד זהב'];

export const LiveSalesPopup = () => {
  const [popup, setPopup] = useState<{name: string, city: string, product: string, timeAgo: string} | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const showRandomPopup = () => {
      const name = buyers[Math.floor(Math.random() * buyers.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const product = products[Math.floor(Math.random() * products.length)];
      const times = ['לפני 2 דקות', 'לפני 5 דקות', 'עכשיו', 'לפני דקה', 'לפני 10 דקות'];
      const timeAgo = times[Math.floor(Math.random() * times.length)];

      setPopup({ name, city, product, timeAgo });

      // Hide after 6 seconds
      setTimeout(() => {
        setPopup(null);
        // Schedule the next one after hiding
        const nextDelay = (60 + Math.random() * 30) * 1000;
        timeoutId = setTimeout(showRandomPopup, nextDelay);
      }, 6000);
    };

    // Initial wait 15 seconds
    timeoutId = setTimeout(showRandomPopup, 15000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {popup && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -50, y: -20 }}
          className="fixed top-[100px] left-4 md:left-8 z-[60] bg-charcoal/95 backdrop-blur-md border border-pearl/10 rounded-xl p-3 shadow-2xl flex items-center gap-3 max-w-[260px] w-auto"
          dir="rtl"
        >
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-[11px] md:text-xs text-pearl font-medium leading-tight truncate">
              <span className="font-bold">{popup.name}</span> {popup.city}
            </p>
            <p className="text-[10px] text-gold font-bold truncate">{popup.product}</p>
            <p className="text-[9px] text-pearl/40">קנה/תה עכשיו • אומת</p>
          </div>
          <button onClick={() => setPopup(null)} className="p-1 text-pearl/40 hover:text-pearl transition-colors">
            <X className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
