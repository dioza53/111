import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Shield, Truck, Droplets, Star, ChevronDown, MessageCircle, X, Camera, Play, Gift, Clock as ClockIcon, Eye, Smartphone, Lightbulb, CheckCircle2, XCircle, ArrowUp, ChevronRight, ChevronLeft, Gem, Sparkles, Heart, Users, Calendar, ShieldCheck, Lock as LockIcon, CreditCard, Instagram, Facebook, Send, User, Mail, MessageSquare, Search, Package, MapPin, AlertCircle, ShoppingBag } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/src/lib/utils';
import { PremiumPackaging } from './PremiumPackaging';

// --- Gift Experience Section ---
export const GiftExperience = () => {
  const occasions = [
    { icon: Heart, title: "יום אהבה", desc: "הדרך הכי רומנטית להגיד 'אני אוהב אותך' עם רגע ששניכם חולקים." },
    { icon: Users, title: "יום הולדת", desc: "מתנה אישית ומקורית שתשאיר אותם ללא מילים ותלווה אותם כל יום." },
    { icon: Calendar, title: "יום נישואין", desc: "הנציחו את הרגע הגדול שלכם בתכשיט יוקרתי שנשמר לנצח." }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 space-y-8">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gold font-black text-[10px] uppercase tracking-[0.3em] block"
            >
              יותר מסתם תכשיט
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-black tracking-tighter leading-tight"
            >
              המתנה שתגרום להם <br />
              <span className="gold-text-gradient">להתרגש באמת.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-pearl/50 text-xl leading-relaxed max-w-xl"
            >
              אנחנו לא מוכרים צמידים, אנחנו מוכרים דרך לשמור את האנשים שאתם הכי אוהבים קרוב אליכם. בכל פעם שהם יסתכלו לתוך הקריסטל, הם יזכרו בכם.
            </motion.p>
            
            <div className="grid gap-6 pt-8">
              {occasions.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex items-start gap-6 p-6 rounded-3xl bg-pearl/5 border border-pearl/5 hover:border-gold/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                    <p className="text-pearl/40 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-gold/10 border border-pearl/10"
            >
              <PremiumPackaging />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="p-8 backdrop-blur-xl bg-black/60 border border-pearl/10 rounded-3xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-charcoal">
                      <Gift className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg">מארז פרימיום כלול</span>
                  </div>
                  <p className="text-pearl/60 text-sm">כל הזמנה מגיעה בקופסת מתנה יוקרתית יחד עם כרטיס ברכה מהודר, מוכנה להענקה למישהו מיוחד.</p>
                </div>
              </div>
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Press / As Seen On Section ---
export const PressSection = () => {
  const logos = ["VOGUE", "GLAMOUR", "ELLE", "COSMO", "BAZAAR"];
  
  return (
    <section className="py-12 bg-black border-y border-pearl/5">
      <div className="container mx-auto px-6">
        <p className="text-center text-[10px] font-black text-pearl/20 uppercase tracking-[0.4em] mb-8">כפי שפורסם ב-</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale contrast-125">
          {logos.map((logo, i) => (
            <span key={i} className="text-2xl md:text-4xl font-serif tracking-tighter font-black">{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
};
export const HowItWorks = () => {
  const steps = [
    {
      icon: Camera,
      title: "מעלים תמונה",
      desc: "בוחרים את הרגע הכי מרגש שלכם ומעלים אותו ישירות לאתר. המערכת שלנו תעזור לכם למרכז את התמונה בצורה מושלמת.",
      image: "https://picsum.photos/seed/upload/600/600"
    },
    {
      icon: Gem,
      title: "אנחנו מייצרים",
      desc: "האמנים שלנו חורטים את התמונה בטכנולוגיית ננו-לייזר בתוך קריסטל HD איכותי, המשובץ בעבודת יד בתוך הצמיד.",
      image: "https://picsum.photos/seed/craft/600/600"
    },
    {
      icon: Sparkles,
      title: "אתם מקרינים",
      desc: "הצמידו את העין או השתמשו בפנס הטלפון כדי להקרין את הזיכרון שלכם בגדול. רגע קסום שמלווה אתכם לכל מקום.",
      image: "https://picsum.photos/seed/project/600/600"
    }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-black text-[10px] uppercase tracking-[0.3em] mb-4 block"
          >
            התהליך שלנו
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tighter"
          >
            איך הקסם קורה?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-pearl/50 max-w-2xl mx-auto text-lg"
          >
            3 שלבים פשוטים בדרך לתכשיט הכי אישי ומרגש שיהיה לכם אי פעם.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <div className="relative z-10 bg-charcoal/40 backdrop-blur-xl border border-pearl/5 rounded-[2.5rem] p-10 flex flex-col items-center text-center hover:border-gold/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(212,175,55,0.1)]">
                <div className="w-20 h-20 rounded-3xl bg-gold/10 flex items-center justify-center text-gold mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <step.icon className="w-10 h-10" />
                </div>
                <div className="absolute top-8 right-8 text-6xl font-black text-pearl/5 select-none">0{i + 1}</div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-pearl/40 text-sm leading-relaxed mb-10">{step.desc}</p>
                <div className="w-full aspect-square rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" referrerPolicy="no-referrer" />
                </div>
              </div>
              {/* Connector for desktop */}
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-6 translate-x-1/2 -translate-y-1/2 z-0 opacity-20">
                  <ChevronLeft className="w-12 h-12 text-gold animate-pulse" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Comparison Section ---
export const ComparisonTable = () => {
  const features = [
    { name: "חומר הגלם", lumi: "פלדת אל-חלד 316L (אינה מחלידה)", other: "סגסוגת זולה (משחירה מהר)" },
    { name: "איכות העדשה", lumi: "קריסטל HD אופטי", other: "פלסטיק מטושטש" },
    { name: "עמידות במים", lumi: "עמידות מלאה (מקלחת/ים)", other: "אסור להרטיב" },
    { name: "חדות התמונה", lumi: "טכנולוגיית ננו-חריטה חדה", other: "תמונה מפוקסלת וכהה" },
    { name: "אריזה", lumi: "קופסת פרימיום שחורה", other: "שקית פלסטיק פשוטה" },
  ];

  return (
    <section className="py-24 bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">למה LumiBrace?</h2>
          <p className="text-pearl/60">אל תתפשרו על האיכות כשמדובר בזיכרונות שלכם.</p>
        </div>

        <div className="max-w-4xl mx-auto overflow-hidden rounded-[2rem] border border-pearl/10 shadow-2xl">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-pearl/5">
                <th scope="col" className="p-6 md:p-8 font-bold text-pearl/40 uppercase tracking-widest text-xs">תכונה</th>
                <th scope="col" className="p-6 md:p-8 font-bold text-gold text-center">LumiBrace</th>
                <th scope="col" className="p-6 md:p-8 font-bold text-pearl/40 text-center">מתחרים זולים</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pearl/5">
              {features.map((f, i) => (
                <tr key={i} className="hover:bg-pearl/5 transition-colors">
                  <th scope="row" className="p-6 md:p-8 text-sm font-bold text-pearl/80 text-right">{f.name}</th>
                  <td className="p-6 md:p-8 text-sm text-center bg-gold/5">
                    <div className="flex flex-col items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-gold" aria-hidden="true" />
                      <span className="text-pearl font-medium">{f.lumi}</span>
                    </div>
                  </td>
                  <td className="p-6 md:p-8 text-sm text-center opacity-40">
                    <div className="flex flex-col items-center gap-2">
                      <XCircle className="w-5 h-5" aria-hidden="true" />
                      <span>{f.other}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

// --- UGC Gallery ---
export const UGCGallery = () => {
  const photos = [
    { url: "https://picsum.photos/seed/ugc1/600/800", name: "מיכל", text: "המתנה הכי מרגשת שקיבלתי בחיים!" },
    { url: "https://picsum.photos/seed/ugc2/600/600", name: "יוסי", text: "האיכות מדהימה, ההקרנה חדה מאוד." },
    { url: "https://picsum.photos/seed/ugc3/800/600", name: "עדי", text: "הזמנתי זוג לי ולבן זוגי, אנחנו לא מורידים אותם." },
    { url: "https://picsum.photos/seed/ugc4/600/800", name: "רוני", text: "שירות לקוחות מעולה ומשלוח מהיר." },
    { url: "https://picsum.photos/seed/ugc5/600/600", name: "טל", text: "האריזה כל כך יוקרתית, מושלם למתנה." },
    { url: "https://picsum.photos/seed/ugc6/800/600", name: "אור", text: "פשוט וואו. התמונה נראית מעולה על הקיר." }
  ];

  return (
    <section className="py-32 bg-charcoal overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-black text-[10px] uppercase tracking-[0.3em] mb-4 block"
          >
            קהילה של זיכרונות
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">רגעים אמיתיים של לקוחות</h2>
          <p className="text-pearl/50 max-w-2xl mx-auto">הצטרפו לאלפי לקוחות שכבר שומרים את הזיכרונות שלהם קרוב ללב.</p>
        </div>
        
        <div className="columns-2 md:columns-3 gap-6 space-y-6">
          {photos.map((photo, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative group rounded-[2rem] overflow-hidden break-inside-avoid border border-pearl/5 hover:border-gold/30 transition-all duration-700"
              role="img"
              aria-label={`תמונה של לקוחה בשם ${photo.name}: ${photo.text}`}
            >
              <img 
                src={photo.url} 
                alt={`תמונה של לקוחה ${photo.name}`} 
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 p-6 md:p-8 flex flex-col justify-end">
                <div className="flex items-center gap-1 text-gold mb-2" aria-label="דירוג 5 כוכבים">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-3 h-3 fill-current" aria-hidden="true" />)}
                </div>
                <p className="text-white font-black text-sm md:text-lg mb-1">{photo.name}</p>
                <p className="text-pearl/70 text-xs md:text-sm italic leading-relaxed">"{photo.text}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Sticky Buy Bar ---
export const StickyBuyBar = ({ onBuyClick }: { onBuyClick: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const productSection = document.getElementById('design');
      if (productSection) {
        const threshold = productSection.offsetTop + productSection.offsetHeight - 100;
        setIsVisible(scrollY > threshold);
      } else {
        setIsVisible(scrollY > 1500);
      }
      
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && !isScrolling && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-charcoal/80 backdrop-blur-2xl border-t border-pearl/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
        >
          <div className="container mx-auto max-w-4xl flex items-center gap-4">
            <div className="flex-1">
              <p className="text-[10px] font-black text-gold uppercase tracking-widest mb-0.5">מבצע מוגבל בזמן</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-pearl">₪229</span>
                <span className="text-xs text-pearl/40 line-through">₪458</span>
              </div>
            </div>
            <button 
              onClick={onBuyClick}
              className="px-8 md:px-12 py-4 bg-gold text-charcoal font-black rounded-2xl text-sm md:text-base shadow-xl shadow-gold/20 active:scale-95 transition-all whitespace-nowrap"
            >
              עצבו את הצמיד שלכם
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Trust Section ---
export const TrustSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const trustPoints = [
    {
      icon: Shield,
      title: "איכות ללא פשרות",
      desc: "הצמידים שלנו עשויים מפלדת אל-חלד 316L, עמידים במים ואינם משחירים לעולם. קריסטל ההקרנה בטכנולוגיית HD מבטיח תמונה חדה וברורה."
    },
    {
      icon: Truck,
      title: "משלוח מבוטח לכל הארץ",
      desc: "זמני המשלוח כרגע הם בין 8 ל-18 ימי עסקים וזאת בשל המצב הביטחוני. במידה ויהיו עיכובים נוספים לאור המצב נדאג לעדכן אתכם."
    },
    {
      icon: Star,
      title: "100% שביעות רצון",
      desc: "הלקוחות שלנו הם הלב של העסק. אנחנו מבטיחים החלפה מלאה בכל מקרה של פגם בייצור או חוסר שביעות רצון מהאיכות."
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trustPoints.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, trustPoints.length]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % trustPoints.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + trustPoints.length) % trustPoints.length);
  };

  return (
    <section className="py-24 bg-pearl/5 border-y border-pearl/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">למה לבחור ב-LumiBrace?</h2>
          <p className="text-pearl/60 max-w-2xl mx-auto">אנחנו לא עוד חנות תכשיטים. אנחנו בוטיק שמתמחה ביצירת רגעים נצחיים באיכות הגבוהה ביותר.</p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="relative overflow-hidden px-4 md:px-12" role="region" aria-live="polite" aria-label="יתרונות המותג">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-center space-y-6 py-8"
              >
                <div className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center text-gold mx-auto mb-8 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                  {(() => {
                    const Icon = trustPoints[currentIndex].icon;
                    return <Icon className="w-12 h-12" aria-hidden="true" />;
                  })()}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">{trustPoints[currentIndex].title}</h3>
                <p className="text-pearl/50 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                  {trustPoints[currentIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <button 
            onClick={prev}
            className="absolute top-1/2 -left-2 md:left-0 -translate-y-1/2 p-3 rounded-full bg-pearl/5 border border-pearl/10 text-pearl/40 hover:text-gold hover:border-gold/50 transition-all z-10 focus-visible:ring-2 focus-visible:ring-gold outline-none"
            aria-label="הקודם"
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>
          <button 
            onClick={next}
            className="absolute top-1/2 -right-2 md:right-0 -translate-y-1/2 p-3 rounded-full bg-pearl/5 border border-pearl/10 text-pearl/40 hover:text-gold hover:border-gold/50 transition-all z-10 focus-visible:ring-2 focus-visible:ring-gold outline-none"
            aria-label="הבא"
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-12" role="tablist" aria-label="בחירת שקופית">
            {trustPoints.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(i);
                }}
                role="tab"
                aria-selected={currentIndex === i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 focus-visible:ring-2 focus-visible:ring-gold outline-none",
                  currentIndex === i ? "w-8 bg-gold" : "w-2 bg-pearl/20 hover:bg-pearl/40"
                )}
                aria-label={`עבור לשקופית ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Testimonials Carousel Section ---
export const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      name: "דנה לוי",
      location: "תל אביב",
      text: "הצמיד פשוט מושלם! התמונה יוצאת כל כך ברורה וזה מרגש כל פעם מחדש. לא מפסיקה לקבל מחמאות.",
      rating: 5,
      image: "https://picsum.photos/seed/user1/100/100"
    },
    {
      name: "אבי כהן",
      location: "חיפה",
      text: "קניתי לאשתי ליום הנישואין והיא בכתה מהתרגשות. שירות מעולה ויחס אישי. מומלץ בחום!",
      rating: 5,
      image: "https://picsum.photos/seed/user2/100/100"
    },
    {
      name: "מאיה גולדשטיין",
      location: "רעננה",
      text: "איכות מדהימה של המתכת והקריסטל. רואים שזה מוצר פרימיום ולא סתם עוד תכשיט. הקנייה הכי טובה שלי השנה.",
      rating: 5,
      image: "https://picsum.photos/seed/user3/100/100"
    },
    {
      name: "רון שפירא",
      location: "ראשון לציון",
      text: "הדרך הכי יפה לשמור את הזיכרון של הכלב שלי תמיד איתי. התמונה חדה מאוד והצמיד נוח מאוד לענידה.",
      rating: 5,
      image: "https://picsum.photos/seed/user4/100/100"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-black text-[10px] uppercase tracking-[0.3em] mb-4 block"
          >
            מה הלקוחות שלנו אומרים
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">אלפי סיפורים מרגשים</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex text-gold">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <span className="text-pearl font-bold">4.9/5</span>
          </div>
          <p className="text-pearl/40 text-sm">מבוסס על יותר מ-1,200 ביקורות מאומתות</p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="relative h-[400px] md:h-[300px]" role="region" aria-live="polite" aria-label="ביקורות לקוחות">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-20"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold/30 p-1">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover rounded-full grayscale"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gold text-charcoal p-1.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                  </div>
                </div>

                <MessageCircle className="w-10 h-10 text-gold/20 mb-6" aria-hidden="true" />
                
                <p className="text-xl md:text-3xl font-medium text-pearl leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div>
                  <h4 className="text-lg font-bold text-gold">{testimonials[currentIndex].name}</h4>
                  <p className="text-pearl/40 text-sm">{testimonials[currentIndex].location}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <button 
              onClick={prev}
              aria-label="ביקורת קודמת"
              className="p-4 rounded-full bg-pearl/5 border border-pearl/10 text-pearl/40 hover:text-gold hover:border-gold/50 transition-all group focus-visible:ring-2 focus-visible:ring-gold outline-none"
            >
              <ChevronRight className="w-6 h-6 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            </button>
            
            <div className="flex gap-3" role="tablist" aria-label="בחירת ביקורת">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(i);
                  }}
                  role="tab"
                  aria-selected={currentIndex === i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500 focus-visible:ring-2 focus-visible:ring-gold outline-none",
                    currentIndex === i ? "w-10 bg-gold" : "w-2 bg-pearl/20 hover:bg-pearl/40"
                  )}
                  aria-label={`עבור לביקורת ${i + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={next}
              aria-label="ביקורת הבאה"
              className="p-4 rounded-full bg-pearl/5 border border-pearl/10 text-pearl/40 hover:text-gold hover:border-gold/50 transition-all group focus-visible:ring-2 focus-visible:ring-gold outline-none"
            >
              <ChevronLeft className="w-6 h-6 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Contact Section ---
export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'אנא הזינו שם מלא';
    if (!formData.email.trim()) {
      newErrors.email = 'אנא הזינו כתובת אימייל';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'כתובת האימייל אינה תקינה';
    }
    if (!formData.message.trim()) newErrors.message = 'אנא כתבו לנו מה הבעיה או השאלה שלכם';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setErrors({ submit: 'אירעה שגיאה בשליחת הטופס. אנא נסו שוב מאוחר יותר.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-charcoal relative overflow-hidden" id="contact">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="bg-pearl/5 backdrop-blur-xl border border-pearl/10 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="text-center mb-12">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold font-black text-[10px] uppercase tracking-[0.3em] mb-4 block"
            >
              שירות הלקוחות שלנו
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">יש לכם שאלה? אנחנו כאן</h2>
            <p className="text-pearl/60">אנחנו זמינים לכל שאלה, בעיה או סתם כדי להגיד שלום. צוות LumiBrace ידאג לחזור אליכם בהקדם.</p>
          </div>

          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center"
            >
              <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center text-gold mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">ההודעה נשלחה בהצלחה!</h3>
              <p className="text-pearl/60">תודה שפנית אלינו. נחזור אליך בהקדם האפשרי למייל שציינת.</p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 text-gold font-bold hover:underline"
              >
                שליחת הודעה נוספת
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-pearl/80 flex items-center gap-2">
                    <User className="w-4 h-4 text-gold" /> שם מלא
                  </label>
                  <div className="relative">
                    <input 
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={cn(
                        "w-full bg-black/40 border rounded-2xl px-6 py-4 text-pearl outline-none transition-all focus:border-gold",
                        errors.name ? "border-red-500/50" : "border-pearl/10"
                      )}
                      placeholder="איך קוראים לך?"
                    />
                    {errors.name && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-[10px] font-bold mt-1 absolute">{errors.name}</motion.p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-pearl/80 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gold" /> דוא״ל
                  </label>
                  <div className="relative">
                    <input 
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={cn(
                        "w-full bg-black/40 border rounded-2xl px-6 py-4 text-pearl outline-none transition-all focus:border-gold",
                        errors.email ? "border-red-500/50" : "border-pearl/10"
                      )}
                      placeholder="example@mail.com"
                    />
                    {errors.email && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-[10px] font-bold mt-1 absolute">{errors.email}</motion.p>
                    )}
                  </div>
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-pearl/80 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-gold" /> איך נוכל לעזור?
                </label>
                <div className="relative">
                  <textarea 
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={cn(
                      "w-full bg-black/40 border rounded-2xl px-6 py-4 text-pearl outline-none transition-all focus:border-gold resize-none",
                      errors.message ? "border-red-500/50" : "border-pearl/10"
                    )}
                    placeholder="כתבו לנו את כל הפרטים..."
                  />
                  {errors.message && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-[10px] font-bold mt-1 absolute">{errors.message}</motion.p>
                  )}
                </div>
              </div>

              {errors.submit && (
                <p className="text-red-500 text-sm text-center">{errors.submit}</p>
              )}

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-charcoal py-6 rounded-[2rem] font-black text-xl shadow-[0_20px_50px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                    שולח...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    שלחו הודעה
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// --- Track Order Section ---
export const TrackOrderView = ({ onBack }: { onBack: () => void }) => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [status, setStatus] = useState<null | 'not-found' | 'processing' | 'shipped'>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !email) return;

    setIsSearching(true);
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // In a real app, this would query Shopify
      if (orderId.startsWith('#') || orderId.length > 4) {
        setStatus(Math.random() > 0.5 ? 'shipped' : 'processing');
      } else {
        setStatus('not-found');
      }
    } catch (err) {
      setStatus('not-found');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal pt-32 pb-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <button 
          onClick={onBack}
          className="mb-12 flex items-center gap-2 text-pearl/40 hover:text-gold transition-colors group focus-visible:ring-2 focus-visible:ring-gold outline-none rounded-lg"
        >
          <ChevronRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          חזרה לדף הבית
        </button>

        <div className="bg-pearl/5 backdrop-blur-2xl border border-pearl/10 rounded-[3rem] p-8 md:p-16 shadow-2xl">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-8">
              <Package className="w-10 h-10" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">מעקב אחר הזמנה</h1>
            <p className="text-pearl/60 text-lg max-w-xl mx-auto">
              הזינו את מספר ההזמנה שלכם (מהמייל שקיבלתם) ואת כתובת האימייל ששימשה לביצוע ההזמנה כדי לראות את הסטטוס העדכני.
            </p>
          </div>

          <form onSubmit={handleTrack} className="space-y-6 max-w-lg mx-auto">
            <div className="space-y-2">
              <label htmlFor="order-id" className="text-sm font-bold text-pearl/80">מספר הזמנה</label>
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pearl/20" />
                <input 
                  type="text"
                  id="order-id"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="#12345"
                  className="w-full bg-black/40 border border-pearl/10 rounded-2xl px-12 py-4 text-pearl outline-none focus:border-gold transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="track-email" className="text-sm font-bold text-pearl/80">כתובת אימייל</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pearl/20" />
                <input 
                  type="email"
                  id="track-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className="w-full bg-black/40 border border-pearl/10 rounded-2xl px-12 py-4 text-pearl outline-none focus:border-gold transition-all"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSearching}
              className="w-full bg-gold text-charcoal py-6 rounded-[2rem] font-black text-xl shadow-xl shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSearching ? (
                <>
                  <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                  מחפש הזמנה...
                </>
              ) : (
                'בדקו סטטוס הזמנה'
              )}
            </button>
          </form>

          {/* Results Area */}
          <AnimatePresence mode="wait">
            {status && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-16 pt-16 border-t border-white/5"
              >
                {status === 'not-found' ? (
                  <div className="text-center p-8 bg-red-500/5 rounded-3xl border border-red-500/20">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">לא מצאנו את ההזמנה הזו</h3>
                    <p className="text-pearl/40 text-sm">אנא ודאו שמספר ההזמנה והאימייל נכונים. שימו לב שלוקח כ-24 שעות עד שהזמנה חדשה מופיעה במערכת.</p>
                  </div>
                ) : (
                  <div className="space-y-12">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <p className="text-sm text-pearl/40 mb-1">סטטוס הזמנה {orderId}</p>
                        <h3 className="text-2xl font-bold text-gold">
                          {status === 'processing' ? 'בהכנה ידנית' : 'בדרך אליך'}
                        </h3>
                      </div>
                      <div className="px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-bold flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        ייתכנו עיכובים בגלל המצב הביטחוני
                      </div>
                    </div>

                    {/* Stepper */}
                    <div className="relative">
                      <div className="absolute top-5 left-0 right-0 h-0.5 bg-pearl/10" />
                      <div className="grid grid-cols-4 relative z-10">
                        {[
                          { label: 'הזמנה התקבלה', icon: ShoppingBag, completed: true },
                          { label: 'בייצור והתאמה', icon: Gem, completed: true },
                          { label: 'בקרת איכות', icon: ShieldCheck, completed: status === 'shipped' },
                          { label: 'בדרך אליך', icon: Truck, completed: status === 'shipped' }
                        ].map((step, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                              step.completed ? "bg-gold text-charcoal scale-110" : "bg-charcoal border-2 border-pearl/10 text-pearl/20"
                            )}>
                              <step.icon className="w-5 h-5" />
                            </div>
                            <span className={cn(
                              "text-[10px] md:text-sm font-bold mt-4 text-center",
                              step.completed ? "text-pearl" : "text-pearl/20"
                            )}>{step.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gold/5 rounded-3xl p-6 md:p-8 border border-gold/10">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gold/20 rounded-2xl text-gold shrink-0">
                          <ClockIcon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold mb-2">צפי הגעה מוערך</h4>
                          <p className="text-pearl/60 text-sm leading-relaxed">
                            בשל המצב הביטחוני, זמני האספקה כרגע הם בין 8 ל-18 ימי עסקים. אנחנו עושים את מירב המאמצים כדי שהתכשיט הייחודי שלך יגיע אליך במהירות האפשרית. נדאג לעדכן אותך במייל על כל שינוי.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- FAQ Section ---
export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "איך עובדת ההקרנה של התמונה?",
      a: "בתוך הצמיד נמצא קריסטל מיוחד המכיל את התמונה שלכם בטכנולוגיית ננו-חריטה. ניתן לראות את התמונה ב-3 דרכים: הצמדת העין לקריסטל, הצמדת מצלמת הטלפון, או הקרנה על קיר חשוך באמצעות פנס הטלפון."
    },
    {
      q: "האם הצמיד עמיד במים ובשימוש יומיומי?",
      a: "בהחלט. הצמידים שלנו עשויים מפלדת אל-חלד 316L (Stainless Steel) איכותית ביותר. הם עמידים במים, אינם מחלידים ואינם משחירים. ניתן להתקלח איתם ולהיכנס איתם לים או לבריכה ללא חשש."
    },
    {
      q: "איזו תמונה הכי כדאי להעלות?",
      a: "התוצאה הטובה ביותר מתקבלת מתמונות חדות, מוארות וברורות. מומלץ שהנושא המרכזי (פנים, חיית מחמד) יהיה במרכז התמונה. הימנעו מצילומי מסך (Screenshots) או תמונות חשוכות מדי."
    },
    {
      q: "כמה זמן לוקח עד שהצמיד מגיע אליי?",
      a: "זמני הייצור והמשלוח הם בין 8 ל-18 ימי עסקים וזאת בשל המצב הביטחוני בארץ. במידה ויהיו עיכובים נוספים לאור המצב נדאג לעדכן אתכם מיד."
    },
    {
      q: "האם ניתן להחליף את התמונה אחרי ההזמנה?",
      a: "מכיוון שמדובר בייצור אישי שמתחיל מיד עם ההזמנה, ניתן לבצע שינויים בתמונה רק בתוך השעה הראשונה מרגע ההזמנה. לאחר מכן הצמיד נכנס לייצור ולא ניתן לשנותו."
    }
  ];

  return (
    <section className="py-32 bg-charcoal relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">שאלות נפוצות</h2>
          <p className="text-pearl/50">כל מה שרציתם לדעת על LumiBrace במקום אחד.</p>
        </div>
        
        <div className="grid gap-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "border rounded-[2rem] transition-all duration-500 overflow-hidden",
                openIndex === i ? "border-gold/30 bg-gold/5" : "border-pearl/5 bg-pearl/5 hover:border-pearl/20"
              )}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                className="w-full p-8 text-right flex items-center justify-between group focus-visible:ring-2 focus-visible:ring-gold outline-none"
              >
                <span className={cn("font-bold text-lg md:text-xl transition-colors", openIndex === i ? "text-gold" : "text-pearl")}>
                  {faq.q}
                </span>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500",
                  openIndex === i ? "bg-gold text-charcoal rotate-180" : "bg-pearl/10 text-pearl/40 group-hover:bg-pearl/20"
                )}>
                  <ChevronDown className="w-5 h-5" aria-hidden="true" />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    id={`faq-answer-${i}`}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-8 pb-8 text-pearl/60 text-base md:text-lg leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
export const Footer = ({ onPrivacyClick }: { onPrivacyClick?: () => void }) => (
  <footer className="py-24 bg-black border-t border-pearl/10">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-16 mb-20">
        <div className="space-y-8">
          <div className="text-4xl font-black tracking-tighter gold-text-gradient">LUMIBRACE</div>
          <p className="text-pearl/40 text-base leading-relaxed">
            הזיכרון שלך, תמיד איתך. מותג תכשיטי יוקרה המשלב טכנולוגיה ורגש ליצירת רגעים נצחיים.
          </p>
          <div className="flex gap-4">
          </div>
        </div>
        
        <div>
          <h4 className="font-black mb-8 uppercase tracking-widest text-[10px] text-gold">ניווט מהיר</h4>
          <ul className="space-y-4 text-sm text-pearl/60">
            <li><a href="#" className="hover:text-gold transition-colors flex items-center gap-2"><ChevronLeft className="w-3 h-3" /> קולקציה</a></li>
            <li><a href="#" className="hover:text-gold transition-colors flex items-center gap-2"><ChevronLeft className="w-3 h-3" /> הסיפור שלנו</a></li>
            <li><a href="#" className="hover:text-gold transition-colors flex items-center gap-2"><ChevronLeft className="w-3 h-3" /> ביקורות לקוחות</a></li>
            <li><a href="#contact" className="hover:text-gold transition-colors flex items-center gap-2"><ChevronLeft className="w-3 h-3" /> צור קשר</a></li>
            <li><button onClick={() => window.dispatchEvent(new CustomEvent('changeView', { detail: 'track-order' }))} className="hover:text-gold transition-colors flex items-center gap-2 outline-none"><ChevronLeft className="w-3 h-3" /> מעקב משלוח</button></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-black mb-8 uppercase tracking-widest text-[10px] text-gold">שירות לקוחות</h4>
          <ul className="space-y-4 text-sm text-pearl/60">
            <li><a href="#" className="hover:text-gold transition-colors flex items-center gap-2"><ChevronLeft className="w-3 h-3" /> מדיניות משלוחים</a></li>
            <li><a href="#" className="hover:text-gold transition-colors flex items-center gap-2"><ChevronLeft className="w-3 h-3" /> החלפות והחזרות</a></li>
            <li><button onClick={() => window.dispatchEvent(new CustomEvent('changeView', { detail: 'track-order' }))} className="hover:text-gold transition-colors flex items-center gap-2 outline-none text-right"><ChevronLeft className="w-3 h-3" /> מעקב משלוח</button></li>
            <li><button onClick={onPrivacyClick} className="hover:text-gold transition-colors flex items-center gap-2 outline-none text-right"><ChevronLeft className="w-3 h-3" /> מדיניות פרטיות</button></li>
            <li><button onClick={() => window.dispatchEvent(new CustomEvent('openAccessibility'))} className="hover:text-gold transition-colors flex items-center gap-2 outline-none text-right"><ChevronLeft className="w-3 h-3" /> הצהרת נגישות</button></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-black mb-8 uppercase tracking-widest text-[10px] text-gold">הצטרפו למועדון</h4>
          <p className="text-sm text-pearl/40 mb-6">הירשמו לקבלת עדכונים על קולקציות חדשות ומבצעים בלעדיים.</p>
          <div className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="האימייל שלך" 
              aria-label="כתובת אימייל להרשמה למועדון"
              className="bg-pearl/5 border border-pearl/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-gold transition-colors w-full focus-visible:ring-1 focus-visible:ring-gold"
            />
            <button className="bg-gold text-charcoal px-8 py-4 rounded-2xl text-sm font-black w-full hover:scale-105 transition-transform shadow-lg shadow-gold/20 focus-visible:ring-2 focus-visible:ring-white outline-none">הרשמה</button>
          </div>
        </div>
      </div>
      
      <div className="pt-12 border-t border-pearl/5 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="text-[10px] text-pearl/20 uppercase tracking-widest font-black">© 2026 LUMIBRACE. כל הזכויות שמורות.</p>
          <p className="text-[9px] text-pearl/10 uppercase tracking-widest">מיוצר באהבה בישראל 🇮🇱</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 opacity-20 grayscale">
          <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> <span className="text-[10px] font-bold">SECURE CHECKOUT</span></div>
          <div className="flex items-center gap-2"><LockIcon className="w-4 h-4" /> <span className="text-[10px] font-bold">SSL ENCRYPTED</span></div>
          <div className="flex items-center gap-2"><CreditCard className="w-4 h-4" /> <span className="text-[10px] font-bold">PCI COMPLIANT</span></div>
        </div>
      </div>
    </div>
  </footer>
);

// --- WhatsApp Button ---
export const WhatsAppButton = () => (
  <a 
    href="https://wa.me/972500000000" 
    target="_blank" 
    rel="noreferrer"
    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group"
  >
    <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />
    <span className="absolute right-full mr-4 bg-white text-charcoal px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity hidden md:block whitespace-nowrap shadow-xl border border-gray-100">
      צריכים עזרה עם התמונה?
    </span>
  </a>
);

// --- Social Proof Notification ---
export const SocialProof = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(0);

  const notifications = [
    { name: "שירה מתל אביב", action: "עיצבה את הצמיד שלה", time: "לפני 4 דקות" },
    { name: "נועה מחיפה", action: "רכשה את 'הזוג הנצחי'", time: "לפני 12 דקות" },
    { name: "דניאל מירושלים", action: "הוסיף הקדשה מרגשת", time: "לפני 25 דקות" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentNotification((prev) => (prev + 1) % notifications.length);
          setIsVisible(true);
        }, 1000);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="fixed bottom-24 left-6 md:bottom-8 md:left-8 z-[60] bg-charcoal/90 backdrop-blur-xl border border-pearl/10 p-3 md:p-4 rounded-2xl shadow-2xl flex items-center gap-3 md:gap-4 max-w-[240px] md:max-w-xs"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">
            <Star className="w-5 h-5 md:w-6 md:h-6 fill-current" />
          </div>
          <div className="text-xs md:text-sm">
            <p className="font-bold">{notifications[currentNotification].name}</p>
            <p className="text-pearl/60 text-[10px] md:text-xs">{notifications[currentNotification].action}</p>
            <p className="text-gold/50 text-[9px] md:text-[10px] uppercase font-bold mt-1">{notifications[currentNotification].time}</p>
          </div>
          <button onClick={() => setIsVisible(false)} className="p-1 hover:bg-pearl/10 rounded-full transition-colors self-start">
            <X className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Scroll To Top Button ---
export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const productSection = document.getElementById('design');
      if (productSection) {
        const threshold = productSection.offsetTop + productSection.offsetHeight - 200;
        setIsVisible(scrollY > threshold);
      } else {
        setIsVisible(scrollY > 1200);
      }
      
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && !isScrolling && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 md:bottom-28 md:right-8 z-[55] w-9 h-9 bg-gold text-charcoal rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
