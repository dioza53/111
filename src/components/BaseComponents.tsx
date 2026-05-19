import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Phone, Check, Star, Clock, Shield, Truck, Camera } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/src/lib/utils';
import Cropper from 'react-easy-crop';

// --- Announcement Bar ---
export const AnnouncementBar = () => (
  <div 
    role="status"
    aria-label="הודעה חשובה"
    className="bg-gold text-charcoal py-1.5 md:py-2 px-4 text-center text-[10px] md:text-sm font-bold tracking-wide"
  >
    מבצע השקה: 50% הנחה לזמן מוגבל | משלוח לכל חלקי הארץ 🚚
  </div>
);

// --- Header ---
export const Header = ({ onDesignClick, onCartClick }: { onDesignClick: () => void; onCartClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'קולקציה', href: '#design' },
    { name: 'הסיפור שלנו', href: '#our-story' },
    { name: 'מעקב משלוח', onClick: () => window.dispatchEvent(new CustomEvent('changeView', { detail: 'track-order' })) },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <AnnouncementBar />
      <header className={cn(
        "transition-all duration-300",
        isScrolled ? "bg-charcoal/90 backdrop-blur-md py-3 shadow-lg" : "bg-charcoal/40 backdrop-blur-sm py-4 md:py-6"
      )}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(true)}
              aria-label="פתח תפריט"
              aria-expanded={isMenuOpen}
              className="p-2 -m-2 lg:hidden text-pearl hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold outline-none rounded-lg"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('changeView', { detail: 'home' }))}
              className="text-lg md:text-2xl font-bold tracking-tighter gold-text-gradient whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg px-2"
            >
              LUMIBRACE
            </button>
          </div>
          
          <nav aria-label="תפריט ראשי" className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
            {navLinks.map(link => (
              link.onClick ? (
                <button key={link.name} onClick={link.onClick} className="hover:text-gold transition-colors focus-visible:text-gold outline-none cursor-pointer">{link.name}</button>
              ) : (
                <a key={link.name} href={link.href} className="hover:text-gold transition-colors focus-visible:text-gold outline-none">{link.name}</a>
              )
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={onDesignClick}
              className="hidden md:block px-6 py-2 bg-gold text-charcoal font-bold rounded-full text-sm hover:scale-105 transition-transform focus-visible:ring-2 focus-visible:ring-white outline-none"
            >
              עצבו עכשיו
            </button>
            <button 
              onClick={onCartClick} 
              aria-label="סל הקניות"
              className="relative cursor-pointer p-2 -m-2 text-pearl hover:text-gold transition-colors focus-visible:ring-2 focus-visible:ring-gold outline-none rounded-full"
            >
              <ShoppingBag className="w-6 h-6" aria-hidden="true" />
              <span className="absolute top-1 right-1 bg-gold text-charcoal text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">1</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-charcoal z-[70] p-8 flex flex-col shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="תפריט נייד"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="text-xl font-bold gold-text-gradient">LUMIBRACE</div>
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  aria-label="סגור תפריט"
                  className="p-2 -m-2 text-pearl/40 hover:text-pearl focus-visible:ring-2 focus-visible:ring-gold outline-none rounded-full"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
              <nav aria-label="תפריט נייד משני" className="flex flex-col gap-8 text-xl font-bold">
                {navLinks.map(link => (
                  link.onClick ? (
                    <button 
                      key={link.name} 
                      onClick={() => { setIsMenuOpen(false); link.onClick?.(); }}
                      className="hover:text-gold transition-colors flex items-center justify-between group outline-none focus-visible:text-gold text-right w-full"
                    >
                      {link.name}
                      <div className="w-2 h-2 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </button>
                  ) : (
                    <a 
                      key={link.name} 
                      href={link.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-gold transition-colors flex items-center justify-between group outline-none focus-visible:text-gold"
                    >
                      {link.name}
                      <div className="w-2 h-2 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </a>
                  )
                ))}
              </nav>
              <div className="mt-auto pt-8 border-t border-pearl/10 space-y-6">
                <button 
                  onClick={() => { setIsMenuOpen(false); onDesignClick(); }}
                  className="w-full py-4 bg-gold text-charcoal font-bold rounded-full text-lg shadow-lg shadow-gold/20 hover:scale-[1.02] transition-transform focus-visible:ring-2 focus-visible:ring-white outline-none"
                >
                  התחילו לעצב
                </button>
                <div className="flex items-center justify-center gap-4 text-pearl/40">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm">זמינים עבורכם בוואטסאפ</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Hero Section ---
export const Hero = ({ onDesignClick }: { onDesignClick: () => void }) => (
  <section className="relative min-h-[90vh] md:h-screen flex items-center justify-center overflow-hidden pt-20">
    <div className="absolute inset-0 z-0">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="w-full h-full object-cover opacity-40"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-light-particles-floating-in-a-dark-background-10-large.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/40 to-charcoal"></div>
    </div>

    <div className="container mx-auto px-6 relative z-10 text-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-8xl font-bold mb-6 tracking-tighter leading-tight">
          הזיכרון שלך, <br />
          <span className="gold-text-gradient">תמיד איתך.</span>
        </h1>
        <p className="text-base md:text-xl text-pearl/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          צמיד הקרנה יוקרתי המכיל את הרגעים היפים ביותר שלכם. 
          איכות ללא פשרות, עיצוב נצחי ורגש שעובר בכל מבט.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button 
            onClick={onDesignClick}
            className="w-full md:w-auto px-10 py-4 bg-gold text-charcoal font-bold rounded-full text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-gold/20 focus-visible:ring-2 focus-visible:ring-white outline-none"
          >
            התחילו לעצב
          </button>
          <button className="w-full md:w-auto px-10 py-4 border border-pearl/20 rounded-full text-lg hover:bg-pearl/10 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-gold outline-none">
            צפו בקולקציה
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);
