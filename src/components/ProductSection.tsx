import { useState, useCallback, useRef, ChangeEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Check, Star, Shield, Truck, Droplets, Info, X, ZoomIn, ZoomOut, RotateCcw, MessageCircle, Clock, Share2, Facebook, Instagram, Link, Copy, ChevronDown, Gem, Sparkles, ShieldCheck, Box, AlertCircle, Lightbulb, Lock as LockIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import Cropper from 'react-easy-crop';
import { cn } from '@/src/lib/utils';
import { shopifyService } from '@/src/services/shopifyService';

// --- Types ---
interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

// --- Image Crop Tool ---
export const ImageCropModal = ({ 
  image, 
  onClose, 
  onSave 
}: { 
  image: string; 
  onClose: () => void; 
  onSave: (croppedImage: string) => void;
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: CropArea) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    
    // Simple canvas crop simulation
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(
          img,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );
        onSave(canvas.toDataURL('image/jpeg'));
      }
    };
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/95 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      aria-label="עריכת תמונה"
    >
      <div className="bg-charcoal border border-pearl/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col h-[80vh]">
        <div className="p-6 flex items-center justify-between border-b border-pearl/10">
          <h3 className="text-xl font-bold gold-text-gradient">מרכזו את התמונה שלכם</h3>
          <button 
            onClick={onClose} 
            aria-label="סגור עריכה"
            className="p-2 hover:bg-pearl/10 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-gold outline-none"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="relative flex-1 bg-black/50">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropShape="round"
            showGrid={false}
          />
        </div>

        <div className="p-8 bg-charcoal/80 backdrop-blur-md">
          <div className="flex items-center gap-4 mb-8">
            <ZoomOut className="w-5 h-5 text-pearl/50" aria-hidden="true" />
            <input 
              type="range" 
              value={zoom} 
              min={1} 
              max={3} 
              step={0.1} 
              aria-label="זום לתמונה"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 h-1 bg-pearl/10 rounded-lg appearance-none cursor-pointer accent-gold focus-visible:ring-2 focus-visible:ring-gold outline-none"
            />
            <ZoomIn className="w-5 h-5 text-pearl/50" aria-hidden="true" />
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={handleSave}
              className="flex-1 py-4 bg-gold text-charcoal font-bold rounded-full text-lg hover:scale-105 transition-transform focus-visible:ring-2 focus-visible:ring-white outline-none"
            >
              שמירה ואישור
            </button>
            <button 
              onClick={onClose}
              className="px-8 py-4 border border-pearl/20 rounded-full font-medium hover:bg-pearl/10 transition-colors focus-visible:ring-2 focus-visible:ring-gold outline-none"
            >
              ביטול
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Simulated Projection Preview ---
export const ProjectionPreview = ({ image }: { image: string | null }) => (
  <div className="relative aspect-square w-full max-w-md mx-auto rounded-3xl overflow-hidden bg-black/20 border border-pearl/5 group">
    <div className="absolute inset-0 flex items-center justify-center">
      {/* The "Light Beam" Effect - Pulsing */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.15)_0%,transparent_70%)]"
      ></motion.div>
      
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* The Projection Cone - Subtle Flicker */}
        <motion.div 
          animate={{ 
            opacity: [0, 0.05, 0.03, 0.07, 0.04],
            rotate: [-91, -89, -90.5, -89.5, -90]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(212,175,55,0.05)_160deg,rgba(212,175,55,0.1)_180deg,rgba(212,175,55,0.05)_200deg,transparent_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        ></motion.div>

        {/* The Image Container */}
        <div className="relative z-10 w-48 h-48 rounded-full overflow-hidden border-4 border-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.3)]">
          {image ? (
            <div className="relative w-full h-full">
              <img src={image} className="w-full h-full object-cover" alt="Projection Preview" />
              
              {/* Shimmer Effect Overlay */}
              <motion.div 
                animate={{ 
                  x: ['-100%', '100%'],
                  opacity: [0, 0.3, 0]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatDelay: 2
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              ></motion.div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-charcoal text-pearl/30 p-8 text-center">
              <Camera className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-sm">העלו תמונה כדי לראות את ההקרנה</p>
            </div>
          )}
        </div>
        
        {/* Glow effect - Pulsing */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 rounded-full bg-gold/10 blur-3xl"
        ></motion.div>
      </div>
    </div>
    
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-charcoal/80 backdrop-blur-md border border-pearl/10 rounded-full text-xs font-medium tracking-widest uppercase text-pearl/60">
      תצוגה מקדימה של ההקרנה
    </div>
  </div>
);

// --- Share Modal ---
export const ShareModal = ({ onClose }: { onClose: () => void }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialPlatforms = [
    { name: 'WhatsApp', icon: MessageCircle, color: 'bg-[#25D366]', url: `https://wa.me/?text=${encodeURIComponent('תראו את הצמיד המדהים הזה! ' + shareUrl)}` },
    { name: 'Facebook', icon: Facebook, color: 'bg-[#1877F2]', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { name: 'Copy Link', icon: Link, color: 'bg-pearl/10', url: 'copy' },
  ];

  const handlePlatformClick = (platform: typeof socialPlatforms[0]) => {
    if (platform.url === 'copy') {
      handleCopy();
    } else if (platform.url !== '#') {
      window.open(platform.url, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-charcoal/95 backdrop-blur-xl">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-charcoal border border-pearl/10 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
      >
        <div className="p-6 flex items-center justify-between border-b border-pearl/10">
          <h3 className="text-xl font-bold gold-text-gradient">שתפו את LumiBrace</h3>
          <button onClick={onClose} className="p-2 hover:bg-pearl/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-3 gap-4">
            {socialPlatforms.map((platform) => (
              <button 
                key={platform.name}
                onClick={() => handlePlatformClick(platform)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-110 shadow-lg",
                  platform.color
                )}>
                  <platform.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-pearl/60">{platform.name === 'Copy Link' ? (copied ? 'הועתק!' : 'העתקת קישור') : platform.name}</span>
              </button>
            ))}
          </div>

          <div className="p-4 bg-pearl/5 border border-pearl/10 rounded-2xl">
            <p className="text-[10px] font-bold uppercase tracking-widest text-pearl/40 mb-2">קישור ישיר</p>
            <div className="flex gap-2 items-center">
              <div className="flex-1 text-xs text-pearl/60 truncate font-mono">
                {shareUrl}
              </div>
              <button 
                onClick={handleCopy}
                className="text-gold hover:text-gold/80 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};



// --- Product Gallery ---
export const ProductGallery = ({ croppedImage, color, charmType }: { croppedImage: string | null; color: string; charmType: 'circle' | 'heart' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'product' | 'projection'>('product');
  const containerRef = useRef<HTMLDivElement>(null);

  const productImages = [
    'https://picsum.photos/seed/bracelet-1/1200/1200',
    'https://picsum.photos/seed/bracelet-2/1200/1200',
    'https://picsum.photos/seed/bracelet-3/1200/1200',
    'https://picsum.photos/seed/bracelet-4/1200/1200',
  ];

  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current || viewMode !== 'product') return;
    setTouchEnd({ x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY });
  };

  const handleTouchEnd = () => {
    const xDiff = touchStart.x - touchEnd.x;
    const yDiff = touchStart.y - touchEnd.y;
    
    // Minimum swipe distance
    if (Math.abs(xDiff) > 50 && Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        // Swipe Left (Next)
        setActiveIndex(prev => (prev + 1) % productImages.length);
      } else {
        // Swipe Right (Prev)
        setActiveIndex(prev => (prev - 1 + productImages.length) % productImages.length);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex p-1 bg-pearl/5 border border-pearl/10 rounded-2xl w-fit mx-auto" role="tablist" aria-label="מצבי תצוגה">
        <button 
          onClick={() => setViewMode('product')}
          role="tab"
          aria-selected={viewMode === 'product'}
          aria-label="תצוגת צמיד"
          className={cn(
            "px-4 md:px-6 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-gold",
            viewMode === 'product' ? "bg-gold text-charcoal shadow-lg" : "text-pearl/40 hover:text-pearl"
          )}
        >
          הצמיד
        </button>
        <button 
          onClick={() => setViewMode('projection')}
          role="tab"
          aria-selected={viewMode === 'projection'}
          aria-label="תצוגת הקרנה"
          className={cn(
            "px-4 md:px-6 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-gold",
            viewMode === 'projection' ? "bg-gold text-charcoal shadow-lg" : "text-pearl/40 hover:text-pearl"
          )}
        >
          ההקרנה
        </button>
      </div>

      <div 
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={cn(
          "relative aspect-square rounded-[2.5rem] overflow-hidden bg-black/20 border border-pearl/5 group shadow-2xl touch-pan-y"
        )}
      >
        {/* Swipe Indicators (Mobile Only) */}
        {viewMode === 'product' && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center pointer-events-none lg:hidden z-20">
            <motion.div 
              animate={{ x: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-8 h-8 rounded-full bg-charcoal/40 backdrop-blur-md flex items-center justify-center text-pearl/40"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.div>
            <motion.div 
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-8 h-8 rounded-full bg-charcoal/40 backdrop-blur-md flex items-center justify-center text-pearl/40"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {viewMode === 'product' ? (
            <motion.div
              key={`img-${activeIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <img 
                src={productImages[activeIndex]} 
                className="w-full h-full object-cover"
                alt="Product Detail View"
                loading="eager"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ) : (
            <motion.div
              key="projection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full h-full"
            >
              <ProjectionPreview image={croppedImage} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {viewMode === 'product' && (
        <div className="grid grid-cols-4 gap-4">
          {productImages.map((img, i) => (
            <button 
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "aspect-square rounded-2xl overflow-hidden border-2 transition-all relative group",
                activeIndex === i ? "border-gold shadow-lg shadow-gold/20" : "border-pearl/10 hover:border-gold/30"
              )}
            >
              <img src={img} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={`View ${i}`} />
              {activeIndex === i && (
                <motion.div layoutId="activeThumb" className="absolute inset-0 border-2 border-gold rounded-2xl pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Gift Card Preview ---
export const GiftCardPreview = ({ note }: { note: string }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="relative aspect-[1.6/1] w-full bg-[#FDFBF7] rounded-xl shadow-inner border border-gold/20 p-8 flex flex-col items-center justify-center text-center overflow-hidden group"
  >
    {/* Decorative border */}
    <div className="absolute inset-4 border border-gold/10 pointer-events-none"></div>
    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold/20 rounded-tl-xl"></div>
    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold/20 rounded-br-xl"></div>
    
    <div className="relative z-10 space-y-4 max-w-[80%]">
      <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-2">LumiBrace Premium</div>
      <p className={cn(
        "text-charcoal/80 italic leading-relaxed transition-all duration-500",
        note ? "text-sm md:text-base" : "text-xs opacity-30"
      )}>
        {note || "ההקדשה המרגשת שלכם תופיע כאן..."}
      </p>
      <div className="w-8 h-[1px] bg-gold/30 mx-auto mt-4"></div>
    </div>

    {/* Texture overlay */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
  </motion.div>
);


// --- Upsell Modal ---
const UpsellModal = ({ onAccept, onDecline }: { onAccept: () => void, onDecline: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onDecline}
      className="absolute inset-0 bg-black/90 backdrop-blur-md"
    />
    <motion.div 
      initial={{ scale: 0.9, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 30 }}
      className="relative bg-charcoal border border-gold/30 rounded-[2.5rem] p-8 md:p-12 max-w-xl w-full shadow-[0_0_100px_rgba(212,175,55,0.15)] text-center overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
      
      <div className="relative z-10 space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gold/10 rounded-full mb-2">
          <Sparkles className="w-10 h-10 text-gold animate-pulse" />
        </div>
        
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">הצעה מיוחדת: <br /><span className="gold-text-gradient">אל תתנו לזיכרון להישאר לבד</span></h2>
          <p className="text-pearl/60 text-lg leading-relaxed max-w-md mx-auto">
            גילינו שרוב הלקוחות שלנו מעדיפים לשמור זיכרון אחד לעצמם ולהעניק את השני לאדם היקר להם מכל.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center justify-between gap-4">
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-gold font-bold mb-1">שדרוג לזוג צמידים</p>
            <p className="text-xl font-bold">₪389 בלבד <span className="text-sm text-pearl/40 font-normal line-through mr-2">₪778</span></p>
          </div>
          <div className="bg-gold text-charcoal px-4 py-2 rounded-xl text-xs font-black">
            חיסכון של ₪389
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={onAccept}
            className="w-full py-5 bg-gold text-charcoal font-bold rounded-full text-xl shadow-2xl shadow-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
          >
            כן, אני רוצה לשדרג לזוג מרגש
            <Check className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={onDecline}
            className="w-full py-3 text-pearl/30 hover:text-pearl/60 text-sm font-medium transition-colors"
          >
            לא תודה, אני מעדיף להמשיך עם צמיד בודד
          </button>
        </div>
      </div>
    </motion.div>
  </div>
);


// --- Design Tips Section ---
const DesignTips = () => {
  const [isOpen, setIsOpen] = useState(false);

  const tips = [
    {
      title: "חדות ואיכות",
      desc: "השתמשו בתמונה מקורית וחדה. תמונות מטושטשות או כאלו שעברו צילום מסך (Screenshot) עלולות להיראות פחות טוב בהקרנה."
    },
    {
      title: "תאורה טובה",
      desc: "בחרו תמונה שצולמה באור יום או בתאורה חזקה. תמונות חשוכות מדי יקשו על ראיית הפרטים הקטנים."
    },
    {
      title: "מרכז התמונה",
      desc: "ודאו שהנושא המרכזי (פנים, חיית מחמד) נמצא במרכז הפריים. המערכת שלנו תעזור לכם למרכז, אך בסיס טוב הוא המפתח."
    },
    {
      title: "רקע נקי",
      desc: "רקע עמוס מדי עלול להסיח את הדעת. רקע פשוט או מטושטש (Bokeh) יגרום לנושא שלכם לבלוט ולהיראות מדהים."
    }
  ];

  return (
    <div className="border border-gold/20 rounded-3xl overflow-hidden bg-gold/5">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between hover:bg-gold/10 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
            <Lightbulb className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm">טיפים לעיצוב מושלם</span>
        </div>
        <ChevronDown className={cn("w-5 h-5 text-gold transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0 grid gap-4">
              {tips.map((tip, i) => (
                <div key={i} className="flex gap-3 text-right">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                  <div>
                    <h5 className="text-xs font-bold text-gold mb-1">{tip.title}</h5>
                    <p className="text-[11px] text-pearl/60 leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Product Section ---
export const ProductSection = ({ onAddToCart }: { onAddToCart: () => void }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [isProjectionOpen, setIsProjectionOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isUpsellOpen, setIsUpsellOpen] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('gold');
  const [selectedCharm, setSelectedCharm] = useState<'circle' | 'heart'>('circle');
  const [bundle, setBundle] = useState<'single' | 'pair'>('single');
  const [giftNote, setGiftNote] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mainCtaRef = useRef<HTMLButtonElement>(null);

  const handleAddToCart = async () => {
    if (!croppedImage) {
      setUploadError('אנא העלו תמונה לפני ההוספה לסל');
      // Scroll to upload area
      document.getElementById('design')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (bundle === 'single') {
      setIsUpsellOpen(true);
    } else {
      await processCheckout();
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  const processCheckout = async () => {
    const variantId = import.meta.env.VITE_SHOPIFY_PRODUCT_VARIANT_ID;
    
    if (!variantId) {
      // Fallback for demo if no Shopify ID is provided
      onAddToCart();
      return;
    }

    setIsUploading(true);
    let imageUrl = 'Customer uploaded a custom image';
    
    try {
      if (croppedImage) {
        // Dynamically import to avoid loading Firebase SDK if not needed
        const { uploadImageToStorage } = await import('@/src/lib/firebase');
        imageUrl = await uploadImageToStorage(croppedImage);
      }
    } catch (error) {
      console.error("Failed to upload image to Firebase:", error);
      setUploadError('שגיאה בהעלאת התמונה. אנא נסו שוב.');
      setIsUploading(false);
      return;
    }

    const customAttributes = [
      { key: 'Bundle', value: bundle },
      { key: 'Color', value: selectedColor },
      { key: 'Charm Type', value: selectedCharm },
      { key: 'Gift Note', value: giftNote || 'None' },
      { key: 'Image URL', value: imageUrl }
    ];

    try {
      await shopifyService.redirectToCheckout(variantId, customAttributes);
    } catch (error) {
      console.error('Checkout redirection failed:', error);
      setBundle('single');
      setUploadError('התשלום נכשל והסל אופס לצמיד בודד. אנא נסו שוב או צרו קשר עם התמיכה.');
      // Scroll to error message
      document.getElementById('design')?.scrollIntoView({ behavior: 'smooth' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpsellAccept = async () => {
    setBundle('pair');
    setIsUpsellOpen(false);
    // We need to use the updated bundle value or pass it directly
    const variantId = import.meta.env.VITE_SHOPIFY_PRODUCT_VARIANT_ID;
    if (variantId) {
      try {
        await shopifyService.redirectToCheckout(variantId, [
          { key: 'Bundle', value: 'pair' },
          { key: 'Gift Note', value: giftNote || 'None' }
        ]);
      } catch (error) {
        console.error('Checkout redirection failed (upsell):', error);
        setBundle('single');
        setUploadError('התשלום נכשל והסל אופס לצמיד בודד. אנא נסו שוב.');
        document.getElementById('design')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onAddToCart();
    }
  };

  const handleUpsellDecline = async () => {
    setIsUpsellOpen(false);
    await processCheckout();
  };

  // Magnetic Button Effect
  useEffect(() => {
    const btn = mainCtaRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) scale(1.02)`;
    };

    const handleMouseLeave = () => {
      btn.style.transform = `translate(0, 0) scale(1)`;
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError(null);

    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadError('אנא העלו קובץ תמונה בלבד (JPG, PNG וכד\')');
        // Clear the input so the user can try again
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setUploadError('הקובץ גדול מדי. המקסימום המותר הוא 10MB');
        // Clear the input so the user can try again
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setIsCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="design" className="py-24 bg-charcoal relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-start">
          
          {/* Left: Visuals */}
          <div className="space-y-8 lg:sticky lg:top-32">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative group"
            >
              <ProductGallery croppedImage={croppedImage} color={selectedColor} charmType={selectedCharm} />
            </motion.div>
          </div>

          {/* Right: Options */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex text-gold">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-sm text-pearl/60">(4.9/5 מתוך 1,240 ביקורות)</span>
                </div>
                <button 
                  onClick={() => setIsShareModalOpen(true)}
                  className="p-3 bg-pearl/5 border border-pearl/10 rounded-full text-pearl/60 hover:text-gold hover:border-gold/50 transition-all group"
                  title="שתפו את המוצר"
                >
                  <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-tight">
                  LumiBrace Signature
                  <span className="block text-xl md:text-2xl font-bold text-pearl/40 mt-2 tracking-normal">צמיד הזיכרונות המקורי עם הקרנת תמונה אישית</span>
                </h2>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl md:text-6xl font-black gold-text-gradient drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">₪{bundle === 'single' ? '229' : '389'}</span>
                <div className="flex flex-col">
                  <span className="text-xl text-pearl/40 line-through decoration-gold/50">₪{bundle === 'single' ? '458' : '778'}</span>
                  <span className="px-3 py-1 bg-gold/20 text-gold text-[10px] font-bold rounded-full uppercase tracking-wider w-fit">50% הנחה</span>
                </div>
              </div>
            </div>

            {/* Step 1: Customize */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gold text-charcoal text-xs flex items-center justify-center">1</span>
                  עצבו את הצמיד שלכם
                </h3>
              </div>

              {/* Color Selection */}
              <div className="space-y-3">
                <p className="text-sm font-bold text-pearl/60">בחרו צבע:</p>
                <div className="flex gap-4" role="radiogroup" aria-label="בחירת צבע צמיד">
                  {[
                    { id: 'gold', name: 'זהב', color: '#D4AF37' },
                    { id: 'silver', name: 'כסף', color: '#C0C0C0' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c.id)}
                      role="radio"
                      aria-checked={selectedColor === c.id}
                      aria-label={c.name}
                      className={cn(
                        "flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-gold",
                        selectedColor === c.id ? "border-gold bg-gold/5" : "border-pearl/10 hover:border-pearl/30"
                      )}
                    >
                      <div className="w-8 h-8 rounded-full shadow-inner" style={{ backgroundColor: c.color }} aria-hidden="true" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-3">
                <p className="text-sm font-bold text-pearl/60">העלו תמונה:</p>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  aria-label="העלאת תמונה אישית"
                  className={cn(
                    "border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all group outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    croppedImage ? "border-gold/50 bg-gold/5" : "border-pearl/10 hover:border-gold/30 hover:bg-pearl/5"
                  )}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    className="hidden" 
                    accept="image/*" 
                  />
                  {croppedImage ? (
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold mb-4 shadow-lg">
                        <img src={croppedImage} className="w-full h-full object-cover" alt="תמונה שהועלתה" />
                      </div>
                      <p className="text-gold font-bold">התמונה הועלתה בהצלחה!</p>
                      <div className="flex items-center gap-4 mt-3">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setIsProjectionOpen(true); }}
                          className="text-xs font-bold bg-gold/20 text-gold px-4 py-2 rounded-full hover:bg-gold/30 transition-colors"
                        >
                          צפו בהדמיית הקרנה
                        </button>
                        <button className="text-xs text-pearl/40 hover:text-pearl transition-colors outline-none focus-visible:underline">החליפו תמונה</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-pearl/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Camera className="w-8 h-8 text-pearl/40" aria-hidden="true" />
                      </div>
                      <p className="font-medium mb-1">לחצו כאן להעלאת תמונה</p>
                      <p className="text-xs text-pearl/40">JPG, PNG עד 10MB</p>
                    </div>
                  )}
                </div>
              </div>
              
              <AnimatePresence>
                {uploadError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    role="alert"
                    aria-live="polite"
                    className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    {uploadError}
                  </motion.div>
                )}
              </AnimatePresence>

              <DesignTips />
            </div>

            {/* Step 2: Bundle */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-gold text-charcoal text-xs flex items-center justify-center">2</span>
                  בחרו את המבצע שלכם
                </h3>
              </div>
              <div className="grid gap-4" role="radiogroup" aria-label="בחירת מבצע">
                <div 
                  onClick={() => setBundle('single')}
                  onKeyDown={(e) => e.key === 'Enter' && setBundle('single')}
                  role="radio"
                  aria-checked={bundle === 'single'}
                  tabIndex={0}
                  className={cn(
                    "p-6 rounded-[2rem] border-2 cursor-pointer transition-all flex items-center justify-between group outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    bundle === 'single' ? "border-gold bg-gold/5 shadow-[0_0_30px_rgba(212,175,55,0.1)]" : "border-pearl/5 hover:border-pearl/20"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all", bundle === 'single' ? "border-gold" : "border-pearl/20 group-hover:border-pearl/40")} aria-hidden="true">
                      {bundle === 'single' && <motion.div layoutId="bundle-dot" className="w-3 h-3 bg-gold rounded-full" />}
                    </div>
                    <div>
                      <p className={cn("font-bold transition-colors", bundle === 'single' ? "text-gold" : "text-pearl")}>צמיד בודד</p>
                      <p className="text-xs text-pearl/40">התחלה מושלמת לזיכרון אישי</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black block text-gold">₪229</span>
                    <span className="text-[10px] text-pearl/30 line-through">₪458</span>
                  </div>
                </div>

                <div 
                  onClick={() => setBundle('pair')}
                  onKeyDown={(e) => e.key === 'Enter' && setBundle('pair')}
                  role="radio"
                  aria-checked={bundle === 'pair'}
                  tabIndex={0}
                  className={cn(
                    "p-6 rounded-[2rem] border-2 cursor-pointer transition-all flex items-center justify-between relative overflow-hidden group outline-none focus-visible:ring-2 focus-visible:ring-gold",
                    bundle === 'pair' ? "border-gold bg-gold/5 shadow-[0_0_30px_rgba(212,175,55,0.1)]" : "border-pearl/5 hover:border-pearl/20"
                  )}
                >
                  {/* Most Popular Badge */}
                  <div className="absolute top-0 left-0 bg-gold text-charcoal text-[9px] font-black px-3 py-1 rounded-br-xl uppercase tracking-tighter">
                    הכי פופולארי
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all", bundle === 'pair' ? "border-gold" : "border-pearl/20 group-hover:border-pearl/40")} aria-hidden="true">
                      {bundle === 'pair' && <motion.div layoutId="bundle-dot" className="w-3 h-3 bg-gold rounded-full" />}
                    </div>
                    <div>
                      <p className={cn("font-bold transition-colors", bundle === 'pair' ? "text-gold" : "text-pearl")}>זוג צמידים (הזוג הנצחי)</p>
                      <p className="text-xs text-pearl/40">אחד לך, אחד למישהו שאתה אוהב</p>
                      
                      {/* Free Shipping Indicator */}
                      <div className="flex items-center gap-1.5 mt-2 transition-all">
                        <Truck className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-[10px] font-bold text-green-400 uppercase tracking-tight">משלוח חינם</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <span className="text-xl font-black text-gold">₪389</span>
                    </div>
                    <span className="text-[10px] text-pearl/30 line-through">₪778</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA & Trust Badges */}
            <div className="pt-6 space-y-8">
              <div className="flex">
                <button 
                  ref={mainCtaRef}
                  onClick={handleAddToCart}
                  disabled={isUploading}
                  className="w-full py-6 bg-gold text-charcoal font-black rounded-[2rem] text-xl shadow-[0_20px_50px_rgba(212,175,55,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group relative overflow-hidden focus-visible:ring-2 focus-visible:ring-white outline-none disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                  {isUploading ? (
                    <div className="w-6 h-6 border-4 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="w-6 h-6" aria-hidden="true" />
                  )}
                  <span>{isUploading ? 'מעבד הזמנה...' : 'קנו עכשיו ב-50% הנחה'}</span>
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-pearl/5 flex items-center justify-center text-pearl/40">
                    <Truck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-pearl/40 uppercase tracking-widest">משלוח חינם</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-pearl/5 flex items-center justify-center text-pearl/40">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-pearl/40 uppercase tracking-widest">איכות פרימיום</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-pearl/5 flex items-center justify-center text-pearl/40">
                    <LockIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-pearl/40 uppercase tracking-widest">תשלום מאובטח</span>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <ShareModal onClose={() => setIsShareModalOpen(false)} />
        )}
      </AnimatePresence>

      {/* Crop Modal */}
      <AnimatePresence>
        {isCropModalOpen && selectedImage && (
          <ImageCropModal 
            image={selectedImage} 
            onClose={() => setIsCropModalOpen(false)} 
            onSave={(cropped) => {
              setCroppedImage(cropped);
              setIsCropModalOpen(false);
            }} 
          />
        )}
      </AnimatePresence>

      {/* Upsell Modal */}
      <AnimatePresence>
        {isUpsellOpen && (
          <UpsellModal 
            onAccept={handleUpsellAccept} 
            onDecline={handleUpsellDecline} 
          />
        )}
      </AnimatePresence>

      {/* Projection Simulation Modal */}
      <AnimatePresence>
        {isProjectionOpen && croppedImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
          >
            {/* Flashlight Beam Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
            
            <button 
              onClick={() => setIsProjectionOpen(false)} 
              className="absolute top-6 right-6 text-white/50 hover:text-white z-10 p-2"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="text-center z-10 space-y-8">
              <h3 className="text-white/50 text-sm tracking-[0.3em] uppercase font-light">הדמיית הקרנה בחושך</h3>
              
              <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto rounded-full flex items-center justify-center">
                {/* Projected Image */}
                <motion.img 
                  initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src={croppedImage} 
                  className="w-full h-full object-cover rounded-full mix-blend-screen opacity-90 shadow-[0_0_100px_rgba(255,255,255,0.2)]"
                  style={{ filter: 'contrast(1.2) brightness(1.1)' }}
                  alt="הדמיית הקרנה"
                />
                {/* Light ring */}
                <div className="absolute inset-0 rounded-full border-[4px] border-white/10 shadow-[inset_0_0_50px_rgba(255,255,255,0.2)] pointer-events-none" />
              </div>
              
              <p className="text-white/40 text-xs">כוונו פנס אל גב התכשיט כדי להקרין את התמונה על הקיר</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
