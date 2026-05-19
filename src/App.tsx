import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header, Hero, AnnouncementBar } from './components/BaseComponents';
import { ProductSection } from './components/ProductSection';
import { TrustSection, FAQSection, Footer, UGCGallery, HowItWorks, ComparisonTable, ScrollToTop, StickyBuyBar, GiftExperience, TestimonialsCarousel, ContactSection, TrackOrderView } from './components/ExtraSections';
import { OurStory } from './components/OurStory';
import { CartDrawer } from './components/CartDrawer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { CookieConsent } from './components/CookieConsent';
import { AccessibilitySystem } from './components/AccessibilitySystem';
import { PrivacySettingsModal } from './components/PrivacySettingsModal';
import { LiveSalesPopup } from './components/LiveSalesPopup';
import { Star } from 'lucide-react';

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'track-order'>('home');

  useEffect(() => {
    const handleChangeView = (e: any) => {
      setCurrentView(e.detail);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('changeView', handleChangeView);

    return () => {
      window.removeEventListener('changeView', handleChangeView);
    };
  }, []);

  const scrollToDesign = () => {
    if (currentView !== 'home') {
      setCurrentView('home');
      // Wait for re-render then scroll
      setTimeout(() => {
        const element = document.getElementById('design');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('design');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-charcoal selection:bg-gold selection:text-charcoal">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Header onDesignClick={scrollToDesign} onCartClick={() => setIsCartOpen(true)} />
        </motion.div>
        
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.main 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="pt-20 md:pt-24"
            >
              <Hero onDesignClick={scrollToDesign} />
              
              <ProductSection onAddToCart={() => setIsCartOpen(true)} />
              
              <HowItWorks />
              <OurStory />
              <ComparisonTable />
              
              <UGCGallery />
              <TestimonialsCarousel />
              <FAQSection />
              <ContactSection />
            </motion.main>
          ) : (
            <motion.div
              key="track-order"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <TrackOrderView onBack={() => setCurrentView('home')} />
            </motion.div>
          )}
        </AnimatePresence>

        <Footer onPrivacyClick={() => setIsPrivacyModalOpen(true)} />
        {currentView === 'home' && <ScrollToTop />}
        <StickyBuyBar onBuyClick={scrollToDesign} />
        <LiveSalesPopup />
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <PrivacySettingsModal 
          isOpen={isPrivacyModalOpen} 
          onClose={() => setIsPrivacyModalOpen(false)} 
        />
        <CookieConsent onOpenSettings={() => setIsPrivacyModalOpen(true)} />
        <AccessibilitySystem />
      </div>
    </ErrorBoundary>
  );
}
