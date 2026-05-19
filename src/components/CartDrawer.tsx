import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, ArrowLeft, CheckCircle2, Package, ShieldCheck, Truck, Gift, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import confetti from 'canvas-confetti';

export const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  
  useEffect(() => {
    if (isCheckoutSuccess) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isCheckoutSuccess]);

  const steps = [
    { label: 'העלאת תמונה', icon: ShoppingBag, status: 'complete' },
    { label: 'ייצור ידני', icon: Package, status: 'current' },
    { label: 'בקרת איכות', icon: ShieldCheck, status: 'upcoming' },
    { label: 'משלוח עד הבית', icon: Truck, status: 'upcoming' },
  ];

  const handleCheckout = () => {
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckoutSuccess(true);
    }, 500);
  };

  const handleClose = () => {
    setIsCheckoutSuccess(false);
    setShowTracking(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-charcoal z-[101] shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={showTracking ? 'מעקב הזמנה' : isCheckoutSuccess ? 'אישור הזמנה' : 'סל הקניות'}
          >
            <div className="p-6 border-b border-pearl/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {showTracking ? (
                  <button 
                    onClick={() => setShowTracking(false)} 
                    aria-label="חזרה לסל"
                    className="p-1 hover:bg-pearl/10 rounded-full transition-colors mr-1 focus-visible:ring-2 focus-visible:ring-gold outline-none"
                  >
                    <ArrowRight className="w-5 h-5 text-gold" />
                  </button>
                ) : (
                  <ShoppingBag className="w-6 h-6 text-gold" aria-hidden="true" />
                )}
                <h2 className="text-xl font-bold">
                  {showTracking ? 'מעקב הזמנה' : isCheckoutSuccess ? 'הזמנה הושלמה!' : 'סל הקניות שלך'}
                </h2>
              </div>
              <button 
                onClick={handleClose} 
                aria-label="סגור סל קניות"
                className="p-2 hover:bg-pearl/10 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-gold outline-none"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {showTracking ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <div className="p-6 rounded-3xl bg-pearl/5 border border-pearl/10 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-pearl/40 uppercase tracking-widest font-bold">מספר הזמנה</p>
                        <p className="text-lg font-bold text-gold">#LB-9482</p>
                      </div>
                      <div className="px-3 py-1 bg-gold/10 text-gold rounded-full text-[10px] font-bold uppercase tracking-tighter">
                        בייצור
                      </div>
                    </div>
                    
                    <div className="space-y-6 relative">
                      <div className="absolute top-0 bottom-0 right-4 w-0.5 bg-pearl/10" />
                      
                      {[
                        { label: 'הזמנה התקבלה', time: 'היום, 10:45', status: 'done' },
                        { label: 'התמונה עברה לבדיקה', time: 'היום, 10:50', status: 'done' },
                        { label: 'התחלת ייצור ושיבוץ', time: 'בתהליך...', status: 'active' },
                        { label: 'בקרת איכות ואריזה', time: 'ממתין', status: 'pending' },
                        { label: 'יציאה למשלוח', time: 'ממתין', status: 'pending' },
                      ].map((step, i) => (
                        <div key={i} className="relative flex items-start gap-6 pr-2">
                          <div className={cn(
                            "w-4 h-4 rounded-full z-10 mt-1 ring-4 ring-charcoal",
                            step.status === 'done' ? "bg-gold" : 
                            step.status === 'active' ? "bg-gold animate-pulse" : "bg-pearl/20"
                          )} />
                          <div>
                            <p className={cn("text-sm font-bold", step.status === 'pending' ? "text-pearl/40" : "text-pearl")}>
                              {step.label}
                            </p>
                            <p className="text-[10px] text-pearl/40">{step.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl bg-black/20 border border-pearl/5 space-y-4">
                    <h4 className="font-bold text-sm flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gold" />
                      פרטי משלוח
                    </h4>
                    <div className="text-xs text-pearl/60 space-y-1">
                      <p>ישראל ישראלי</p>
                      <p>רחוב הזיכרונות 12, תל אביב</p>
                      <p>050-1234567</p>
                    </div>
                  </div>

                  <button 
                    onClick={handleClose}
                    className="w-full py-4 border border-pearl/10 rounded-full text-sm font-bold hover:bg-pearl/5 transition-colors"
                  >
                    חזרה לחנות
                  </button>
                </motion.div>
              ) : !isCheckoutSuccess ? (
                <>
                  {/* Progress Bar */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-pearl/40">סטטוס ההזמנה שלך</h3>
                    <div className="relative flex justify-between">
                      <div className="absolute top-4 left-0 right-0 h-0.5 bg-pearl/10 z-0" />
                      <div className="absolute top-4 left-1/2 right-0 h-0.5 bg-gold z-0" />
                      
                      {steps.map((step, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                            step.status === 'complete' ? "bg-gold text-charcoal" : 
                            step.status === 'current' ? "bg-charcoal border-2 border-gold text-gold" : 
                            "bg-charcoal border-2 border-pearl/10 text-pearl/20"
                          )}>
                            {step.status === 'complete' ? <CheckCircle2 className="w-5 h-5" /> : <step.icon className="w-4 h-4" />}
                          </div>
                          <span className={cn(
                            "text-[10px] font-bold whitespace-nowrap",
                            step.status === 'upcoming' ? "text-pearl/20" : "text-pearl"
                          )}>
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cart Item (Mock) */}
                  <div className="p-4 rounded-2xl bg-pearl/5 border border-pearl/10 flex gap-4">
                    <div className="w-20 h-20 rounded-xl bg-black/20 overflow-hidden shrink-0">
                      <img src="https://picsum.photos/seed/bracelet-1/200/200" className="w-full h-full object-cover" alt="LumiBrace Bracelet" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-sm">צמיד LumiBrace - הזוג הנצחי</h4>
                        <span className="text-sm font-bold" aria-label="מחיר: 389 שקלים">₪389</span>
                      </div>
                      <p className="text-xs text-pearl/40 mt-1">צבע: זהב 14K | מארז יוקרתי</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-pearl/10 rounded-lg overflow-hidden">
                          <button aria-label="הפחת כמות" className="px-2 py-1 hover:bg-pearl/5 focus-visible:bg-pearl/10 outline-none">-</button>
                          <span className="px-3 py-1 text-xs border-x border-pearl/10" aria-label="כמות: 1">1</span>
                          <button aria-label="הוסף כמות" className="px-2 py-1 hover:bg-pearl/5 focus-visible:bg-pearl/10 outline-none">+</button>
                        </div>
                        <button aria-label="הסר מוצר מהסל" className="text-xs text-red-400/60 hover:text-red-400 transition-colors focus-visible:underline outline-none">הסרה</button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8 text-center py-8"
                >
                  {/* Notification Banner */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    role="status"
                    aria-live="polite"
                    className="bg-gold/10 border border-gold/20 rounded-2xl p-4 flex items-center justify-between gap-4 text-right"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-gold" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-pearl">ההזמנה נקלטה במערכת</p>
                        <p className="text-[10px] text-pearl/40">אישור נשלח לתיבת המייל</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowTracking(true)}
                      aria-label="עבור למעקב הזמנה"
                      className="text-[10px] font-bold text-gold underline underline-offset-4 hover:text-gold/80 transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-gold outline-none rounded"
                    >
                      מעקב הזמנה
                    </button>
                  </motion.div>

                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                      className="w-full h-full bg-green-500/20 text-green-500 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-12 h-12" />
                    </motion.div>
                    
                    {/* Sparkling accents */}
                    <motion.div
                      animate={{ 
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 45, 90]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute -top-2 -right-2 text-gold"
                    >
                      <Sparkles className="w-6 h-6" />
                    </motion.div>
                    <motion.div
                      animate={{ 
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, -45, -90]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                      className="absolute -bottom-1 -left-3 text-gold/60"
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">תודה על הרכישה!</h3>
                    <p className="text-pearl/60">מספר ההזמנה שלך הוא #LB-9482. אישור נשלח למייל שלך.</p>
                  </div>

                  <button 
                    onClick={() => setShowTracking(true)}
                    className="w-full py-4 bg-pearl/5 border border-pearl/10 rounded-full text-sm font-bold hover:bg-pearl/10 transition-all flex items-center justify-center gap-2"
                  >
                    <Package className="w-4 h-4 text-gold" />
                    עקבו אחר סטטוס ההזמנה
                  </button>

                  {/* Feature 7: Post-Purchase Upsell */}
                  <div className="p-6 rounded-3xl bg-gold/10 border-2 border-gold/30 relative overflow-hidden group" role="region" aria-label="הצעה מיוחדת">
                    <div className="absolute top-0 right-0 bg-gold text-charcoal text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-tighter">
                      הצעה חד פעמית
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-3 text-gold">
                        <Heart className="w-6 h-6 fill-current" aria-hidden="true" />
                        <h4 className="text-lg font-bold">רוצים לפנק עוד מישהו?</h4>
                      </div>
                      <p className="text-sm text-pearl/80">הוסיפו צמיד נוסף להזמנה ב-₪160 בלבד (במקום ₪229)!</p>
                      <div className="flex items-center justify-center gap-4 py-2">
                        <div className="w-16 h-16 rounded-xl bg-black/40 overflow-hidden">
                          <img src="https://storage.googleapis.com/aistudio-genapi-prod-d55eb/zLp_t4f9_9d134d1b-02ba-4d1a-8bbd-ad73e0427ff1.png" className="w-full h-full object-cover" alt="צמיד נוסף" />
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold">צמיד LumiBrace נוסף</p>
                          <p className="text-gold font-bold">₪160 <span className="text-pearl/40 line-through text-[10px]">₪229</span></p>
                        </div>
                      </div>
                      <button className="w-full py-3 bg-gold text-charcoal font-bold rounded-full text-sm hover:scale-105 transition-transform flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white outline-none">
                        הוספה להזמנה בלחיצה אחת
                        <Gift className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <button onClick={handleClose} className="text-xs text-pearl/40 hover:text-pearl transition-colors focus-visible:underline outline-none">לא תודה, אולי בפעם הבאה</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {!isCheckoutSuccess && (
              <div className="p-6 bg-black/40 border-t border-pearl/10 space-y-4" role="region" aria-label="סיכום הזמנה">
                <div className="flex justify-between items-center">
                  <span className="text-pearl/60">סיכום ביניים</span>
                  <span className="font-bold" aria-label="389 שקלים">₪389</span>
                </div>
                <div className="flex justify-between items-center text-gold">
                  <span className="text-sm">משלוח חינם</span>
                  <span className="text-xs font-bold uppercase tracking-widest">מבצע השקה</span>
                </div>
                
                <div className="pt-4 border-t border-pearl/10 flex justify-between items-center text-xl font-bold">
                  <span>סה"כ לתשלום</span>
                  <span className="gold-text-gradient" aria-label="סהכ 389 שקלים">₪389</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  aria-label="מעבר לתשלום מאובטח"
                  className="w-full py-4 bg-gold text-charcoal font-bold rounded-full text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-white outline-none"
                >
                  מעבר לתשלום מאובטח
                  <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <div className="flex items-center justify-center gap-4 opacity-30 grayscale text-[10px] font-bold" aria-label="אמצעי תשלום נתמכים">
                  <span>BIT</span>
                  <span>APPLE PAY</span>
                  <span>GOOGLE PAY</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
