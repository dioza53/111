import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Accessibility, 
  X, 
  Type, 
  Contrast, 
  Sun, 
  Moon, 
  Link as LinkIcon, 
  MousePointer2, 
  RotateCcw, 
  ZapOff, 
  Baseline, 
  Eye, 
  Globe, 
  BookOpen,
  CaseSensitive,
  Check
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface AccessibilitySettings {
  textSize: number; // 0, 1, 2, 3
  readableFont: boolean;
  highContrast: boolean;
  lightMode: boolean;
  invertedColors: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  stopAnimations: boolean;
  largeCursor: boolean;
  readingGuide: boolean;
  textSpacing: number; // 0, 1, 2
  brightTitles: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  textSize: 0,
  readableFont: false,
  highContrast: false,
  lightMode: false,
  invertedColors: false,
  grayscale: false,
  highlightLinks: false,
  stopAnimations: false,
  largeCursor: false,
  readingGuide: false,
  textSpacing: 0,
  brightTitles: false,
};

export const AccessibilitySystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [showStatement, setShowStatement] = useState(false);

  // Load settings
  useEffect(() => {
    const saved = localStorage.getItem('lumibrace_accessibility');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load accessibility settings', e);
      }
    }

    const handleOpenStatement = () => setShowStatement(true);
    window.addEventListener('openAccessibility', handleOpenStatement);
    return () => window.removeEventListener('openAccessibility', handleOpenStatement);
  }, []);

  // Apply settings to body/html
  useEffect(() => {
    localStorage.setItem('lumibrace_accessibility', JSON.stringify(settings));
    
    const root = document.documentElement;
    const body = document.body;

    // Reset classes
    body.classList.remove(
      'acc-readable-font', 
      'acc-high-contrast', 
      'acc-light-mode',
      'acc-inverted', 
      'acc-grayscale', 
      'acc-links', 
      'acc-no-anim', 
      'acc-large-cursor',
      'acc-bright-titles'
    );

    // Apply font size
    const fontSizes = ['100%', '110%', '120%', '130%'];
    root.style.fontSize = fontSizes[settings.textSize];

    // Apply spacing
    const letterSpacings = ['normal', '0.05em', '0.1em'];
    root.style.letterSpacing = letterSpacings[settings.textSpacing];
    
    // Classes
    if (settings.readableFont) body.classList.add('acc-readable-font');
    if (settings.highContrast) body.classList.add('acc-high-contrast');
    if (settings.lightMode) body.classList.add('acc-light-mode');
    if (settings.invertedColors) body.classList.add('acc-inverted');
    if (settings.grayscale) body.classList.add('acc-grayscale');
    if (settings.highlightLinks) body.classList.add('acc-links');
    if (settings.stopAnimations) body.classList.add('acc-no-anim');
    if (settings.largeCursor) body.classList.add('acc-large-cursor');
    if (settings.brightTitles) body.classList.add('acc-bright-titles');

  }, [settings]);

  // Reading Guide mouse follow
  useEffect(() => {
    if (!settings.readingGuide) return;
    
    const guide = document.getElementById('acc-reading-guide') || document.createElement('div');
    if (!guide.id) {
      guide.id = 'acc-reading-guide';
      guide.style.position = 'fixed';
      guide.style.left = '0';
      guide.style.right = '0';
      guide.style.height = '4px';
      guide.style.backgroundColor = 'rgba(255, 255, 0, 0.5)';
      guide.style.zIndex = '9999';
      guide.style.pointerEvents = 'none';
      guide.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
      document.body.appendChild(guide);
    }
    
    const onMouseMove = (e: MouseEvent) => {
      guide.style.top = `${e.clientY - 2}px`;
    };
    
    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      guide.remove();
    };
  }, [settings.readingGuide]);

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings(prev => {
      const next = { ...prev, [key]: !prev[key] };
      
      // Mutual exclusion for contrast modes
      if (key === 'highContrast' && next.highContrast) {
        next.lightMode = false;
        next.invertedColors = false;
      }
      if (key === 'lightMode' && next.lightMode) {
        next.highContrast = false;
        next.invertedColors = false;
      }
      if (key === 'invertedColors' && next.invertedColors) {
        next.highContrast = false;
        next.lightMode = false;
      }
      
      return next;
    });
  };

  const updateNumeric = (key: 'textSize' | 'textSpacing', max: number) => {
    setSettings(prev => ({
      ...prev,
      [key]: (prev[key] + 1) % (max + 1)
    }));
  };

  const resetAll = () => setSettings(DEFAULT_SETTINGS);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-36 right-6 z-[160] w-12 h-12 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        aria-label="פתח תפריט נגישות"
        aria-expanded={isOpen}
      >
        <Accessibility className="w-6 h-6" />
        <span className="absolute right-full mr-3 bg-charcoal text-pearl text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          תפריט נגישות
        </span>
      </button>

      {/* Accessibility Panel Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-end p-4 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            />
            
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="relative w-full max-w-md bg-white text-charcoal rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-labelledby="acc-title"
            >
              {/* Header */}
              <div className="bg-blue-600 p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Accessibility className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 id="acc-title" className="text-xl font-bold">שיפור נגישות</h2>
                    <p className="text-xs text-white/70">התאמת האתר לצרכים שלך</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="סגור תפריט נגישות"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Panel Content */}
              <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                <div className="grid grid-cols-2 gap-3">
                  {/* Grid of options */}
                  <AccOption 
                    icon={Type} 
                    label="גודל טקסט" 
                    value={settings.textSize > 0 ? `+${settings.textSize * 10}%` : 'רגיל'}
                    onClick={() => updateNumeric('textSize', 3)}
                    active={settings.textSize > 0}
                  />
                  <AccOption 
                    icon={CaseSensitive} 
                    label="גופן קריא" 
                    onClick={() => toggleSetting('readableFont')}
                    active={settings.readableFont}
                  />
                  <AccOption 
                    icon={Contrast} 
                    label="ניגודיות גבוהה" 
                    onClick={() => toggleSetting('highContrast')}
                    active={settings.highContrast}
                  />
                  <AccOption 
                    icon={Sun} 
                    label="מצב בהיר" 
                    onClick={() => toggleSetting('lightMode')}
                    active={settings.lightMode}
                  />
                  <AccOption 
                    icon={Eye} 
                    label="צבעים הפוכים" 
                    onClick={() => toggleSetting('invertedColors')}
                    active={settings.invertedColors}
                  />
                  <AccOption 
                    icon={Sun} 
                    label="גווני אפור" 
                    onClick={() => toggleSetting('grayscale')}
                    active={settings.grayscale}
                  />
                  <AccOption 
                    icon={LinkIcon} 
                    label="הדגשת קישורים" 
                    onClick={() => toggleSetting('highlightLinks')}
                    active={settings.highlightLinks}
                  />
                  <AccOption 
                    icon={ZapOff} 
                    label="עצור אנימציות" 
                    onClick={() => toggleSetting('stopAnimations')}
                    active={settings.stopAnimations}
                  />
                  <AccOption 
                    icon={MousePointer2} 
                    label="סמן גדול" 
                    onClick={() => toggleSetting('largeCursor')}
                    active={settings.largeCursor}
                  />
                  <AccOption 
                    icon={BookOpen} 
                    label="מדריך קריאה" 
                    onClick={() => toggleSetting('readingGuide')}
                    active={settings.readingGuide}
                  />
                  <AccOption 
                    icon={Baseline} 
                    label="ריווח טקסט" 
                    value={settings.textSpacing > 0 ? `X${settings.textSpacing + 1}` : 'רגיל'}
                    onClick={() => updateNumeric('textSpacing', 2)}
                    active={settings.textSpacing > 0}
                  />
                  <AccOption 
                    icon={BookOpen} 
                    label="הדגשת כותרות" 
                    onClick={() => toggleSetting('brightTitles')}
                    active={settings.brightTitles}
                  />
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-3">
                  <button
                    onClick={resetAll}
                    className="w-full py-4 rounded-2xl bg-gray-100 text-gray-500 font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    איפס הכל
                  </button>
                  
                  <button
                    onClick={() => setShowStatement(true)}
                    className="w-full py-4 rounded-2xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    הצהרת נגישות
                  </button>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 text-[10px] text-gray-400 text-center">
                תומך WCAG 2.1 | LumiBrace Accessibility System
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Accessibility Statement Modal */}
      <AnimatePresence>
        {showStatement && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowStatement(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white text-charcoal rounded-[2.5rem] p-8 md:p-12 overflow-y-auto max-h-[85vh] custom-scrollbar-light"
            >
              <button 
                onClick={() => setShowStatement(false)}
                className="absolute top-6 left-6 p-2 text-gray-400 hover:text-charcoal transition-colors"
                aria-label="סגור הצהרת נגישות"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-black mb-8 text-blue-600">הצהרת נגישות</h2>
              
              <div className="space-y-6 text-gray-600 leading-relaxed text-sm md:text-base">
                <section>
                  <h3 className="text-xl font-bold text-charcoal mb-3">מבוא</h3>
                  <p>
                    אנו ב-LumiBrace רואים חשיבות רבה במתן שירות שוויוני לכלל הלקוחות ובשיפור השירות הניתן ללקוחות עם מוגבלות. 
                    השקענו משאבים רבים בהנגשת האתר על מנת להפוך אותו לזמין ונוח יותר עבור אנשים עם מוגבלויות.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-charcoal mb-3">רמת הנגישות</h3>
                  <p>
                    אתר זה עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013, 
                    ומותאם להנחיות הנגישות לתוכן אינטרנט של ה-WCAG 2.1 ברמה AA.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-charcoal mb-3">אמצעי הנגישות באתר</h3>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>תפריט נגישות המאפשר שינוי גופנים, צבעים, ניגודיות וגודל טקסט.</li>
                    <li>תמיכה בניווט באמצעות המקלדת בלבד (שימוש במקש Tab).</li>
                    <li>התאמה לקוראי מסך מובילים (NVDA, JAWS).</li>
                    <li>תגיות ARIA לשיפור הבנת מבנה הדף.</li>
                    <li>הפסקת אנימציות ורכיבים זזים שעלולים להפריע.</li>
                    <li>הדגשת קישורים וכותרות בצורה ברורה.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-charcoal mb-3">הנחיות הפעלה</h3>
                  <p>
                    בצד ימין למטה ממוקם כפתור הנגישות. לחיצה עליו פותחת פאנל עם מגוון אפשרויות התאמה. 
                    לניווט במקלדת, יש להשתמש במקש Tab כדי לעבור בין אלמנטים ובמקש Enter להפעלה.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-charcoal mb-3">צרו קשר</h3>
                  <p>
                    למרות מאמצינו להנגיש את כלל הדפים באתר, ייתכן ויתגלו חלקים שטרם הונגשו במלואם. 
                    אם נתקלתם בבעיה או שיש לכם הצעה לשיפור, נשמח לשמוע מכם ולפעול לתיקון:
                  </p>
                  <p className="font-bold mt-2">מייל: accessibility@lumibrace.co.il</p>
                </section>

                <div className="pt-8 border-t border-gray-100 text-xs text-gray-400">
                  הצהרת הנגישות עודכנה לאחרונה בתאריך: 18.05.2024
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Injected Styles for Accessibility */}
      <style>{`
        .acc-readable-font {
          --font-sans: 'Arial', sans-serif !important;
        }
        .acc-high-contrast {
          background-color: #000 !important;
          color: #fff !important;
        }
        .acc-high-contrast * {
          border-color: #fff !important;
        }
        .acc-high-contrast button, 
        .acc-high-contrast a {
          background-color: #ffff00 !important;
          color: #000 !important;
          font-weight: bold !important;
        }
        .acc-light-mode {
          background-color: #f8f8f8 !important;
          color: #111 !important;
        }
        .acc-light-mode .bg-charcoal,
        .acc-light-mode .bg-charcoal\/95,
        .acc-light-mode .bg-charcoal\/90,
        .acc-light-mode .bg-black\/40,
        .acc-light-mode .bg-black\/60,
        .acc-light-mode .bg-black\/80 {
          background-color: #fff !important;
        }
        .acc-light-mode .text-pearl,
        .acc-light-mode .text-pearl\/60,
        .acc-light-mode .text-pearl\/40,
        .acc-light-mode .text-pearl\/20 {
          color: #333 !important;
        }
        .acc-light-mode .border-pearl\/10,
        .acc-light-mode .border-pearl\/20 {
          border-color: rgba(0,0,0,0.1) !important;
        }
        .acc-light-mode .gold-text-gradient {
          background: none !important;
          -webkit-text-fill-color: #b4941f !important;
          color: #b4941f !important;
        }
        .acc-light-mode button.bg-gold {
          background-color: #b4941f !important;
          color: #fff !important;
        }
        .acc-inverted {
          filter: invert(1) hue-rotate(180deg);
        }
        .acc-inverted img,
        .acc-inverted video,
        .acc-inverted [style*="background-image"] {
          filter: invert(1) hue-rotate(180deg);
        }
        .acc-grayscale {
          filter: grayscale(1);
        }
        .acc-links a {
          text-decoration: underline !important;
          color: #3b82f6 !important;
          background-color: rgba(255, 255, 0, 0.2) !important;
          padding: 0 2px;
        }
        .acc-no-anim *,
        .acc-no-anim *::before,
        .acc-no-anim *::after {
          animation: none !important;
          transition: none !important;
        }
        .acc-large-cursor {
          cursor: crosshair !important;
        }
        .acc-large-cursor a,
        .acc-large-cursor button {
          cursor: cell !important;
        }
        .acc-bright-titles h1,
        .acc-bright-titles h2,
        .acc-bright-titles h3 {
          background-color: #ffff00 !important;
          color: #000 !important;
          display: inline-block !important;
          padding: 4px 10px !important;
          border: 2px solid #000 !important;
        }
      `}</style>
    </>
  );
};

const AccOption = ({ 
  icon: Icon, 
  label, 
  onClick, 
  active, 
  value 
}: { 
  icon: any; 
  label: string; 
  onClick: () => void; 
  active: boolean;
  value?: string;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 text-center group",
      active 
        ? "bg-blue-50 border-blue-600 text-blue-600" 
        : "bg-gray-50 border-gray-100 text-gray-500 hover:border-blue-200"
    )}
  >
    <div className={cn(
      "w-10 h-10 rounded-xl flex items-center justify-center transition-colors relative",
      active ? "bg-blue-600 text-white" : "bg-white text-gray-400 group-hover:text-blue-500"
    )}>
      <Icon className="w-5 h-5" />
      {active && (
        <span className="absolute -top-1 -left-1 w-4 h-4 bg-green-500 text-white rounded-full flex items-center justify-center border-2 border-white">
          <Check className="w-2 h-2" />
        </span>
      )}
    </div>
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-bold leading-tight">{label}</span>
      {value && <span className="text-[10px] opacity-60">{value}</span>}
    </div>
  </button>
);
