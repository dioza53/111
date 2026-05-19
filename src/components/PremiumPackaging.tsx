import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const PremiumPackaging = () => {
  return (
    <div className="w-full h-full relative perspective-[2000px] flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* The Greeting Card */}
      <motion.div 
        animate={{ 
          y: [-8, 8, -8],
          rotateZ: [-2, 2, -2],
          rotateY: [5, 10, 5]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute z-20 w-48 md:w-64 aspect-[3/4] bg-[#FDFBF7] text-charcoal p-6 rounded shadow-[0_30px_60px_rgba(0,0,0,0.5)] origin-center rotate-12 translate-x-16 -translate-y-12 flex flex-col justify-between"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flex justify-between items-start">
           <span className="font-serif text-[9px] tracking-[0.2em] font-bold text-gray-400 uppercase">A Gift For You</span>
           <Sparkles className="w-4 h-4 text-gold" />
        </div>
        <div className="text-center space-y-4">
          <p className="font-serif italic text-xl md:text-2xl text-gray-800 leading-tight">"Some moments <br/>are meant to <br/>last forever."</p>
          <div className="w-8 h-px bg-gold mx-auto" />
        </div>
        <div className="text-center cursor-default pb-2">
          <h3 className="font-black tracking-[0.15em] text-sm uppercase text-gray-900 drop-shadow-sm">LumiBrace</h3>
        </div>
        
        {/* Card lighting/texture */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/60 pointer-events-none rounded" />
      </motion.div>

      {/* The Box */}
      <motion.div 
        animate={{ 
          y: [8, -8, 8],
          rotateX: [20, 25, 20],
          rotateY: [-15, -10, -15]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="relative z-10 w-56 md:w-72 aspect-square origin-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Box Shadow */}
        <div style={{ transform: 'translateX(-50%) translateZ(-50px)' }} className="absolute -bottom-10 left-1/2 w-[120%] h-20 bg-black/80 blur-2xl rounded-full" />

        {/* Box Inner base */}
        <div style={{ transform: 'translateZ(-20px)' }} className="absolute inset-0 bg-zinc-900 rounded-lg shadow-[inset_0_0_50px_rgba(0,0,0,1)] border border-white/5 pointer-events-none">
           <div className="absolute inset-4 bg-black/60 rounded flex items-center justify-center">
             <div className="w-16 h-16 rounded-full bg-charcoal shadow-inner blur-[2px]" />
           </div>
        </div>
        
        {/* Box Lid (slighty lifted and shifted to reveal) */}
        <div style={{ transform: 'translateX(12px) translateY(-24px) rotateZ(-4deg) translateZ(10px)' }} className="absolute inset-0 bg-[#1a1a1a] rounded-lg border border-pearl/10 flex flex-col items-center justify-center shadow-2xl z-20">
           {/* Ribbon (Vertical) */}
           <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] flex items-center justify-center z-10 shadow-lg">
             <div className="w-[1px] h-full bg-white/20" />
           </div>

           {/* Ribbon (Horizontal) */}
           <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 bg-gradient-to-b from-[#B8860B] via-[#D4AF37] to-[#B8860B] flex items-center justify-center z-10 shadow-lg">
             <div className="h-[1px] w-full bg-white/20" />
           </div>

           {/* Logo Badge on intersection */}
           <div className="w-20 h-20 rounded-sm bg-[#111] border border-gold/40 flex flex-col items-center justify-center z-30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transform -translate-y-1">
             <Sparkles className="w-5 h-5 text-gold mb-1" />
             <h3 className="text-gold font-black tracking-widest text-xs">LUMI<span className="font-light">BRACE</span></h3>
           </div>
           
           {/* Subtle texture/gradient for box top */}
           <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 via-transparent to-black/40 pointer-events-none" />
           <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/5 pointer-events-none" />
        </div>

      </motion.div>
    </div>
  );
};
