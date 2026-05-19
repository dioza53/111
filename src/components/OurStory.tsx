import { motion } from 'motion/react';
import { Heart, Sparkles, ShieldCheck, Gem, Users, History } from 'lucide-react';

export const OurStory = () => {
  return (
    <section id="our-story" className="py-24 bg-charcoal overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-6"
          >
            <History className="w-4 h-4" />
            הסיפור שלנו
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">יותר מתכשיט, <br /><span className="gold-text-gradient">זה הלב שלכם.</span></h2>
          <p className="text-pearl/60 max-w-2xl mx-auto text-lg">
            LumiBrace נולדה מתוך רצון פשוט: להפוך את הזיכרונות הכי יקרים שלנו למשהו שאפשר לענוד, להרגיש ולראות בכל רגע.
          </p>
        </div>

        {/* The Inspiration */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-pearl/10 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/founder/800/1000" 
                alt="Our Inspiration" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gold/10 backdrop-blur-3xl rounded-full -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">ההשראה שמאחורי LumiBrace</h3>
              <p className="text-pearl/60 leading-relaxed">
                הכל התחיל בשנת 2022, כשחיפשנו דרך להנציח רגע מיוחד. רצינו משהו שהוא לא רק תמונה בטלפון או בתוך מסגרת על הקיר. רצינו משהו אישי, אינטימי, כזה שנמצא תמיד איתנו.
              </p>
              <p className="text-pearl/60 leading-relaxed">
                השילוב בין עולם הצורפות המסורתי לבין טכנולוגיית ננו-אופטיקה מתקדמת אפשר לנו ליצור את הבלתי יאומן: קריסטל זעיר שמכיל בתוכו עולם שלם של רגש.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-pearl/5 border border-pearl/10">
                <Heart className="w-8 h-8 text-gold mb-4" />
                <h4 className="font-bold mb-2">מיוצר באהבה</h4>
                <p className="text-xs text-pearl/40">כל הזמנה מטופלת באופן אישי ומבוקרת ידנית.</p>
              </div>
              <div className="p-6 rounded-3xl bg-pearl/5 border border-pearl/10">
                <Sparkles className="w-8 h-8 text-gold mb-4" />
                <h4 className="font-bold mb-2">חזון המותג</h4>
                <p className="text-xs text-pearl/40">לחבר בין אנשים דרך רגעים של אור וזיכרון.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Craftsmanship */}
        <div className="bg-black/40 rounded-[4rem] p-12 md:p-24 border border-pearl/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[120px] rounded-full" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter">אמנות הדיוק <br /><span className="text-gold">והאיכות ללא פשרות</span></h3>
              <p className="text-pearl/60 leading-relaxed text-lg">
                אנחנו לא מתפשרים על פחות מהטוב ביותר. הצמידים שלנו עשויים מפלדת אל-חלד 316L בדרגת רפואית, המבטיחה עמידות לאורך שנים, היפואלרגניות וברק שאינו דוהה.
              </p>
              
              <ul className="space-y-6">
                {[
                  { icon: Gem, title: "קריסטל HD אופטי", desc: "עדשה מלוטשת המעניקה חדות מקסימלית להקרנה." },
                  { icon: ShieldCheck, title: "עמידות מלאה", desc: "ציפוי PVD יוקרתי העמיד בפני שריטות ומים." },
                  { icon: Users, title: "קהילה של אלפים", desc: "מעל 10,000 לקוחות מרוצים שכבר שומרים את הזיכרון שלהם איתם." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-pearl">{item.title}</h4>
                      <p className="text-sm text-pearl/40">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden border border-gold/20 shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                <img 
                  src="https://picsum.photos/seed/craft/1000/1000" 
                  alt="Craftsmanship" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -top-6 -left-6 bg-charcoal border border-gold/30 p-6 rounded-3xl shadow-2xl backdrop-blur-xl">
                <p className="text-3xl font-bold gold-text-gradient">100%</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-pearl/40">בקרת איכות</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
