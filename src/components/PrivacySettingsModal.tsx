import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, Eye, Database, Cookie, Info, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';

interface PrivacySettings {
  marketingGallery: boolean;
  storePreferences: boolean;
  essentialCookies: boolean;
  analytics: boolean;
}

interface PrivacySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacySettingsModal = ({ isOpen, onClose }: PrivacySettingsModalProps) => {
  const [settings, setSettings] = useState<PrivacySettings>({
    marketingGallery: false,
    storePreferences: true,
    essentialCookies: true,
    analytics: true,
  });

  const [activeTab, setActiveTab] = useState<'policy' | 'settings'>('policy');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('privacySettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to parse privacy settings', e);
      }
    }
  }, []);

  const handleToggle = (key: keyof PrivacySettings) => {
    if (key === 'essentialCookies') return;
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    localStorage.setItem('privacySettings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1500);
  };

  const settingItems = [
    {
      id: 'essentialCookies',
      title: 'עוגיות הכרחיות',
      desc: 'עוגיות אלו נחוצות לתפקוד התקין של האתר, כולל תהליך הרכישה והגדרות האבטחה.',
      icon: Cookie,
      required: true,
    },
    {
      id: 'marketingGallery',
      title: 'שיתוף בגלריית השראה',
      desc: 'אפשר לנו להשתמש בתמונה שהעלית (באופן אנונימי) בגלריית ההשראה של הלקוחות שלנו. אנחנו לעולם לא נשתף פרטים מזהים.',
      icon: Eye,
      required: false,
    },
    {
      id: 'storePreferences',
      title: 'שמירת העדפות',
      desc: 'אפשר לנו לשמור את הבחירות שלך (כמו סוג הצמיד או הקדשה) כדי שתוכל להמשיך מהמקום שבו הפסקת.',
      icon: Database,
      required: false,
    },
    {
      id: 'analytics',
      title: 'שיפור חוויית המשתמש',
      desc: 'עזור לנו להשתפר על ידי שיתוף נתוני שימוש אנונימיים. המידע עוזר לנו להבין איך אנשים משתמשים באתר.',
      icon: Shield,
      required: false,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-charcoal/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-3xl bg-charcoal border border-pearl/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 border-b border-pearl/5 flex flex-col md:flex-row md:items-center justify-between bg-pearl/5 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">מדיניות פרטיות</h2>
                  <p className="text-xs text-pearl/40 uppercase tracking-widest font-bold">Privacy & Data Policy</p>
                </div>
              </div>
              
              <div className="flex bg-black/40 p-1 rounded-2xl self-start md:self-center">
                <button 
                  onClick={() => setActiveTab('policy')}
                  className={cn(
                    "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                    activeTab === 'policy' ? "bg-gold text-charcoal shadow-lg" : "text-pearl/40 hover:text-pearl"
                  )}
                >
                  המדיניות המלאה
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={cn(
                    "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                    activeTab === 'settings' ? "bg-gold text-charcoal shadow-lg" : "text-pearl/40 hover:text-pearl"
                  )}
                >
                  ניהול העדפות
                </button>
              </div>

              <button 
                onClick={onClose}
                className="absolute top-6 left-6 p-3 hover:bg-pearl/5 rounded-full transition-colors text-pearl/40 hover:text-pearl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
              {activeTab === 'policy' ? (
                <div className="space-y-8 text-pearl/80 leading-relaxed text-sm md:text-base">
                  <section>
                    <h3 className="text-xl font-black text-gold mb-4">1. כללי</h3>
                    <p>
                      ברוכים הבאים ל-LumiBrace. הפרטיות שלכם חשובה לנו מאוד. מדיניות פרטיות זו מפרטת כיצד אנו אוספים, משתמשים, שומרים ומגנים על המידע האישי שלכם בעת הביקור באתר והשימוש בשירותים שלנו, וזאת בהתאם לחוק הגנת הפרטיות, התשמ"א-1981 ותקנותיו.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-black text-gold mb-4">2. המידע שאנו אוספים</h3>
                    <p className="mb-2">בעת השימוש באתר, אנו עשויים לאסוף את המידע הבא:</p>
                    <ul className="list-disc pr-6 space-y-2 text-pearl/60">
                      <li>פרטים אישיים: שם מלא, כתובת דואר אלקטרוני, מספר טלפון וכתובת למשלוח.</li>
                      <li>פרטי הזמנה: היסטוריית רכישות, מוצרים שנבחרו ותמונות שהועלו לצורך התאמה אישית של התכשיט.</li>
                      <li>מידע טכני: כתובת IP, סוג דפדפן, מערכת הפעלה ונתוני שימוש אנונימיים באתר.</li>
                      <li>פרטי תשלום: פרטי כרטיס האשראי מעובדים באופן מאובטח באמצעות ספקי סליקה חיצוניים מורשים ואינם נשמרים בשרתי האתר.</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-black text-gold mb-4">3. השימוש במידע</h3>
                    <p className="mb-2">אנו משתמשים במידע שנאסף למטרות הבאות:</p>
                    <ul className="list-disc pr-6 space-y-2 text-pearl/60">
                      <li>עיבוד ואספקת ההזמנות שלכם.</li>
                      <li>מתן שירות לקוחות ומענה לפנייתכם.</li>
                      <li>שיפור חוויית המשתמש והתאמת תוכן האתר.</li>
                      <li>שליחת עדכונים ומבצעים (בכפוף להסכמתכם המפורשת).</li>
                      <li>מניעת הונאות ואבטחת המידע באתר.</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-black text-gold mb-4">4. העברת מידע לצדדים שלישיים</h3>
                    <p>
                      אנו לא נמכור או נשכיר את המידע האישי שלכם לצדדים שלישיים. אנו עשויים לחלוק מידע עם ספקי שירותים חיצוניים (כגון חברות משלוחים, ספקי סליקה ופלטפורמת Shopify) אך ורק לצורך מתן השירות וביצוע ההזמנה.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-black text-gold mb-4">5. אבטחת מידע</h3>
                    <p>
                      אנו נוקטים באמצעי אבטחה טכנולוגיים וארגוניים מתקדמים כדי להגן על המידע האישי שלכם מפני גישה בלתי מורשית, שימוש לרעה או אובדן. עם זאת, יש לזכור כי אף מערכת אינה חסינה לחלוטין.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-black text-gold mb-4">6. זכויותיכם</h3>
                    <p>
                      על פי חוק הגנת הפרטיות, אתם זכאים לעיין במידע עליכם המוחזק במאגר מידע, לבקש לתקן מידע שאינו נכון או למחוק מידע אם תם הצורך בו. פניות בנושא זה ניתן להפנות לשירות הלקוחות שלנו במייל.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-black text-gold mb-4">7. עוגיות (Cookies)</h3>
                    <p>
                      האתר משתמש בעוגיות לצורך תפעולו התקין, איסוף נתונים סטטיסטיים והתאמת האתר להעדפותיכם האישיות. ניתן לנהל את הגדרות העוגיות בלשונית "ניהול העדפות".
                    </p>
                  </section>

                  <div className="pt-8 border-t border-white/5 text-xs text-pearl/40">
                    עודכן לאחרונה: מאי 2024
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-4 items-start">
                    <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-200/60 leading-relaxed">
                      כאן תוכלו לשלוט במידע שאנחנו אוספים. שינוי ההגדרות עשוי להשפיע על חלק מהפיצ'רים באתר.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {settingItems.map((item) => (
                      <div 
                        key={item.id}
                        className={cn(
                          "p-6 rounded-3xl border transition-all",
                          item.required ? "bg-pearl/5 border-pearl/10 opacity-80" : "bg-black/20 border-pearl/5 hover:border-pearl/20"
                        )}
                      >
                        <div className="flex items-start justify-between gap-6">
                          <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-xl bg-pearl/5 flex items-center justify-center text-pearl/60 shrink-0">
                              <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-bold mb-1 flex items-center gap-2 text-pearl">
                                {item.title}
                                {item.required && <span className="text-[10px] bg-pearl/10 px-2 py-0.5 rounded-full text-pearl/40">חובה</span>}
                              </h3>
                              <p className="text-xs text-pearl/40 leading-relaxed">{item.desc}</p>
                            </div>
                          </div>
                          
                          {!item.required && (
                            <button
                              onClick={() => handleToggle(item.id as keyof PrivacySettings)}
                              className={cn(
                                "w-14 h-8 rounded-full p-1 transition-all duration-300 relative shrink-0",
                                settings[item.id as keyof PrivacySettings] ? "bg-gold" : "bg-pearl/10"
                              )}
                            >
                              <motion.div
                                animate={{ x: settings[item.id as keyof PrivacySettings] ? 24 : 0 }}
                                className="w-6 h-6 bg-charcoal rounded-full shadow-lg"
                              />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-pearl/5 bg-black/40 flex items-center justify-between">
              <button 
                onClick={onClose}
                className="text-sm font-bold text-pearl/40 hover:text-pearl transition-colors"
              >
                סגור
              </button>
              {activeTab === 'settings' && (
                <button
                  onClick={handleSave}
                  disabled={saved}
                  className={cn(
                    "px-10 py-4 rounded-full font-black transition-all flex items-center gap-2",
                    saved ? "bg-green-500 text-white" : "bg-gold text-charcoal hover:scale-105 active:scale-95"
                  )}
                >
                  {saved ? (
                    <>
                      <Check className="w-5 h-5" />
                      נשמר בהצלחה
                    </>
                  ) : (
                    'שמור הגדרות'
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
