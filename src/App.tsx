/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Phone,
  Clock,
  MapPin,
  Facebook,
  ChevronRight,
  Star,
  Trees,
  UtensilsCrossed,
  ShieldCheck,
  Leaf
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useMemo, useEffect, useState } from 'react';

// --- SVGs & Decorative Components ---

const PineTreeMini = ({ className = "" }: { className?: string, key?: any }) => (
  <svg viewBox="0 0 100 120" className={className} fill="currentColor">
    <path d="M50 10 L80 50 L20 50 Z" />
    <path d="M50 35 L85 85 L15 85 Z" />
    <path d="M50 70 L90 120 L10 120 Z" />
  </svg>
);

const PineSprig = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 90 Q 50 50 90 10" strokeWidth="3" />
    {[20, 35, 50, 65, 80].map((pos, i) => (
      <g key={i}>
        <path d={`M${pos} ${100-pos} L${pos-15} ${100-pos-10}`} />
        <path d={`M${pos} ${100-pos} L${pos+10} ${100-pos+15}`} />
        <path d={`M${pos} ${100-pos} L${pos-5} ${100-pos-20}`} />
      </g>
    ))}
  </svg>
);

const PineCone = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 60 80" className={className}>
    <g fill="#6B3A2A" stroke="#3d2b1f" strokeWidth="0.5">
      <ellipse cx="30" cy="40" rx="15" ry="25" />
      {[...Array(12)].map((_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        return (
          <path 
            key={i}
            d={`M${15 + col*15} ${15 + row*15} q5,-10 10,0 q-5,10 -10,0`}
            transform={`rotate(${row * 10}, 30, 40)`}
          />
        );
      })}
    </g>
  </svg>
);

const BranchDivider = ({ className = "" }: { className?: string }) => (
  <div className={`w-full py-8 flex items-center justify-center gap-8 px-4 ${className}`}>
    <svg className="hidden md:block w-1/3 h-12 flex-shrink-0 opacity-40 rotate-180" viewBox="0 0 400 60">
      <path d="M400 30 L50 30" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5 5" />
      {[50, 100, 150, 200, 250, 300, 350].map(x => (
        <path key={x} d={`M${x} 30 L${x-15} 10 M${x} 30 L${x-15} 50`} stroke="currentColor" strokeWidth="1.5" />
      ))}
    </svg>
    <Trees className="w-8 h-8 text-moss flex-shrink-0" />
    <svg className="hidden md:block w-1/3 h-12 flex-shrink-0 opacity-40" viewBox="0 0 400 60">
      <path d="M0 30 L350 30" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5 5" />
      {[50, 100, 150, 200, 250, 300, 350].map(x => (
        <path key={x} d={`M${x} 30 L${x+15} 10 M${x} 30 L${x+15} 50`} stroke="currentColor" strokeWidth="1.5" />
      ))}
    </svg>
  </div>
);

const FallingNeedles = () => {
  const [needles, setNeedles] = useState<{id: number, left: number, delay: number, duration: number, drift: number}[]>([]);
  
  useEffect(() => {
    setNeedles([...Array(15)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 10,
      drift: -50 + Math.random() * 100
    })));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {needles.map(n => (
        <motion.div
          key={n.id}
          initial={{ y: -50, x: `${n.left}vw`, opacity: 0, rotate: 0 }}
          animate={{ 
            y: "110vh", 
            x: `${n.left + (n.drift/10)}vw`, 
            opacity: [0, 0.4, 0.4, 0], 
            rotate: 360 
          }}
          transition={{ 
            duration: n.duration, 
            repeat: Infinity, 
            delay: n.delay,
            ease: "linear"
          }}
          className="absolute"
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M2 18 Q 10 10 18 2" stroke="#2A5020" strokeWidth="1.5" fill="none" opacity="0.6" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const Fireflies = () => {
  const [flies, setFlies] = useState<{id: number, top: number, left: number, delay: number}[]>([]);
  
  useEffect(() => {
    setFlies([...Array(15)].map((_, i) => ({
      id: i,
      top: 10 + Math.random() * 80,
      left: 10 + Math.random() * 80,
      delay: Math.random() * 5
    })));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {flies.map(f => (
        <motion.div
          key={f.id}
          className="absolute w-1 h-1 bg-yellow-200 rounded-full blur-[2px] shadow-[0_0_8px_rgba(255,255,150,0.8)]"
          style={{ top: `${f.top}%`, left: `${f.left}%` }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [1, 1.2, 1],
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: f.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const DetailedPineTree = ({ scale = 1, flip = false, highlightRight = true }) => (
  <svg viewBox="0 0 200 600" className="h-full w-auto drop-shadow-2xl" preserveAspectRatio="xMinYMax meet">
    <rect x="96" y="550" width="8" height="50" fill="#2A1A0A" />
    <g transform={`scale(${flip ? -1 : 1} 1)`} style={{ transformOrigin: '100px 300px' }}>
      {[0, 1, 2, 3, 4].map(tier => {
        const y = 550 - tier * 90;
        const width = 120 - tier * 20;
        return (
          <path 
            key={tier}
            d={`M ${100-width},${y} Q 100,${y-30} ${100+width},${y} L 100,${y-120} Z`}
            fill="#0F2010"
            stroke={highlightRight ? "#2A5C2A" : "none"}
            strokeWidth="0.5"
          />
        );
      })}
    </g>
  </svg>
);

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function App() {
  const fbUrl = "https://www.facebook.com/profile.php?id=100040874621081";
  const reviewsUrl = "https://www.facebook.com/profile.php?id=100040874621081&sk=reviews";
  
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const skyY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const starsY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const farTreesY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const midTreesY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const nearTreesY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const fogY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen bg-cream selection:bg-moss selection:text-white overflow-x-hidden">
      <FallingNeedles />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-forest-dark/95 text-cream border-b border-moss/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="https://i.postimg.cc/mZ73V0B6/523497608-1620833512622454-8590443202565289874-n.jpg" 
              alt="Logo" 
              className="h-10 w-10 rounded-full border border-wood-light shadow-[0_0_10px_rgba(139,90,58,0.3)]"
            />
            <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-cream">Leśna Chata</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-[0.2em]">
            <a href="#o-nas" className="hover:text-moss transition-colors">O Nas</a>
            <PineTreeMini className="w-3 h-3 text-moss/50" />
            <a href="#menu" className="hover:text-moss transition-colors">Menu</a>
            <PineTreeMini className="w-3 h-3 text-moss/50" />
            <a href="#godziny" className="hover:text-moss transition-colors">Godziny</a>
            <PineTreeMini className="w-3 h-3 text-moss/50" />
            <a href="#kontakt" className="hover:text-moss transition-colors font-bold text-moss">Kontakt</a>
          </div>
          <div className="flex items-center gap-4">
            <a href={`tel:606455356`} className="p-2 border border-moss/30 rounded-full hover:bg-moss transition-all">
              <Phone className="w-4 h-4" />
            </a>
            <a href={fbUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-all">
              <Facebook className="w-4 h-4 fill-current" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header ref={targetRef} className="relative min-h-[100vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* FOREST LAYERS PARALLAX */}
        <div className="absolute inset-0 z-0 bg-[#0A1209]">
          
          {/* LAYER 1: SKY */}
          <motion.div style={{ y: skyY }} className="absolute inset-0 bg-gradient-to-b from-[#0A1209] to-[#1A2D15]" />
          <motion.div style={{ y: starsY }} className="absolute inset-x-0 top-0 h-1/2 opacity-60">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse" 
                style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, animationDelay: `${Math.random()*3}s` }}
              />
            ))}
            <div className="absolute top-12 right-12 md:right-32 w-24 h-24 rounded-full bg-white opacity-40 blur-md shadow-[0_0_40px_rgba(255,255,255,0.4)]" />
          </motion.div>

          {/* LAYER 2: MOUNTAINS */}
          <div className="absolute inset-x-0 bottom-0 h-1/3">
             <svg className="w-full h-full fill-[#0D1B0C] opacity-50" viewBox="0 0 1000 300" preserveAspectRatio="none">
               <path d="M0 300 L0 150 Q 250 100 500 200 Q 750 150 1000 250 L 1000 300 Z" />
             </svg>
          </div>

          {/* LAYER 3: FAR TREES */}
          <motion.div style={{ y: farTreesY }} className="absolute inset-x-0 bottom-12 h-32 flex items-end justify-center gap-1">
            {[...Array(20)].map((_, i) => (
              <PineTreeMini key={i} className="w-16 h-auto text-[#142B12] opacity-80" />
            ))}
          </motion.div>

          {/* LAYER 4: MID TREES */}
          <motion.div style={{ y: midTreesY }} className="absolute inset-x-0 bottom-0 h-48 flex items-end justify-center gap-4 px-12">
            {[...Array(12)].map((_, i) => (
              <PineTreeMini key={i} className="w-32 h-auto text-[#1A3818] shadow-2xl" />
            ))}
          </motion.div>

          {/* LAYER 6: FOG */}
          <motion.div style={{ y: fogY }} className="absolute inset-x-0 bottom-0 h-32 pointer-events-none">
            <svg className="w-full h-full opacity-10" viewBox="0 0 400 100" preserveAspectRatio="none">
               <motion.path 
                 animate={{ x: [-100, 0, -100] }} 
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 d="M-400 50 Q -200 10 0 50 T 400 50 T 800 50 L 800 100 L -400 100 Z" 
                 fill="#ffffff"
               />
            </svg>
          </motion.div>

          <Fireflies />
        </div>

        {/* LAYER 5: NEAR TREES (FRAMING) */}
        <motion.div style={{ y: nearTreesY }} className="absolute bottom-0 left-0 h-[600px] hidden lg:block z-10 pointer-events-none">
            <div className="flex items-end -ml-16">
              <DetailedPineTree />
              <DetailedPineTree flip scale={0.8} />
            </div>
        </motion.div>
        <motion.div style={{ y: nearTreesY }} className="absolute bottom-0 right-0 h-[600px] hidden lg:block z-10 pointer-events-none">
            <div className="flex items-end -mr-16">
              <DetailedPineTree flip highlightRight={false} />
              <DetailedPineTree scale={0.8} highlightRight={false} />
            </div>
        </motion.div>
        
        {/* Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-20"
        >
          <div className="mb-6 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-forest-green/20 backdrop-blur-sm border border-moss/30 text-white text-sm font-bold uppercase tracking-widest shadow-lg">
            <Trees className="w-4 h-4 text-moss" /> 
            <span className="text-moss">Smaki Prosto z Lasu</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white mb-4 leading-none [text-shadow:0_4px_12px_rgba(0,0,0,0.5)]">
            LEŚNA CHATA
          </h1>
          <p className="text-xl md:text-3xl font-serif italic text-cream/90 mb-12 max-w-2xl mx-auto [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
            Kuchnia Myśliwska — Pasja, Tradycja i Natura
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href={fbUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-10 py-5 bg-moss text-cream rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(139,154,70,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-2 group border border-cream/20"
            >
              Zobacz Dzisiejsze Menu
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="tel:606455356"
              className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              Zarezerwuj Stolik
            </a>
          </div>
        </motion.div>
      </header>

      {/* Philosophy Section */}
      <section id="o-nas" className="py-24 bg-forest-dark text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-forest-texture pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <div className="flex items-center gap-4 mb-6">
                <PineSprig className="w-12 h-12 text-moss" />
                <h2 className="text-4xl md:text-5xl font-bold">Polska Zdrowa Dziczyzna</h2>
              </div>
              <p className="text-xl text-cream/80 leading-relaxed mb-8">
                Leśna Chata zaprasza na dania z dziczyzny, smaki lasu, niespotykane desery i dania, 
                których nie znajdziecie nigdzie w okolicy. Nasze mięso pochodzi z polskiej, 
                dzikiej natury — jest najzdrowszym wyborem na Twoim talerzu.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: Leaf, label: "Naturalna", desc: "Z serca polskich lasów" },
                  { icon: ShieldCheck, label: "Bezpieczna", desc: "Najwyższe standardy" },
                  { icon: UtensilsCrossed, label: "Zdrowa", desc: "Bogata w minerały" }
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-white/5 rounded-2xl border border-wood-medium/30 group hover:border-amber/50 transition-colors">
                    <item.icon className="w-8 h-8 text-amber mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg mb-1">{item.label}</h3>
                    <p className="text-sm text-white/60">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-end opacity-20">
                <PineCone className="w-16 h-16" />
              </div>
            </motion.div>
            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.3 }}
              className="relative aspect-square md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
            >
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Wild Game Dish" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-serif italic text-2xl">"Smak, który pamięta się latami."</p>
                <div className="mt-4 w-12 h-1 bg-moss" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BranchDivider className="bg-cream text-wood-medium/40" />

      {/* Menu / CTA Section */}
      <section id="menu" className="py-24 bg-cream relative">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <PineTreeMini className="w-64 h-64 text-wood-medium" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div {...fadeIn}>
            <div className="relative inline-block mb-6">
              <UtensilsCrossed className="w-16 h-16 text-moss mx-auto" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-forest-dark mb-6">Menu zmienia się każdego dnia</h2>
            <p className="text-xl text-forest-light mb-12 leading-relaxed">
              Dbamy o to, by każda wizyta u nas była nowym kulinarnym odkryciem. 
              Korzystamy z tego, co aktualnie daje las i sprawdzeni dostawcy.
              Aktualne menu sprawdzisz na naszym fanpage'u na Facebooku.
            </p>
            <a 
              href={fbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-12 py-6 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] transition-all transform hover:-translate-y-1"
            >
              <Facebook className="fill-current w-6 h-6 border-r border-white/20 pr-3 box-content" />
              Sprawdź Dzisiejszą Kartę
            </a>
          </motion.div>
        </div>
      </section>

      <BranchDivider className="bg-white text-wood-medium/30" />

      {/* Opening Hours & Reviews */}
      <section id="godziny" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-24">
            <motion.div {...fadeIn}>
              <div className="flex items-center gap-4 mb-10">
                <Clock className="w-10 h-10 text-wood-medium" />
                <h2 className="text-3xl font-bold text-forest-dark uppercase tracking-widest border-b-2 border-wood-medium pb-2">Godziny Otwarcia</h2>
              </div>
              <div className="space-y-4">
                {[
                  { day: "Poniedziałek", hours: "10:00 - 21:00" },
                  { day: "Wtorek", hours: "10:00 - 21:00" },
                  { day: "Środa", hours: "10:00 - 21:00" },
                  { day: "Czwartek", hours: "10:00 - 21:00" },
                  { day: "Piątek", hours: "10:00 - 21:00" },
                  { day: "Sobota", hours: "10:00 - 22:00" },
                  { day: "Niedziela", hours: "10:00 - 20:00" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-forest-green/5 hover:bg-forest-green/[0.02] px-4 rounded-lg transition-colors group">
                    <span className="font-bold text-forest-dark flex items-center gap-2">
                       <PineTreeMini className="w-3 h-3 text-moss opacity-0 group-hover:opacity-100 transition-opacity" />
                       {item.day}
                    </span>
                    <span className="font-mono text-forest-light bg-forest-green/5 px-3 py-1 rounded">{item.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <div className="flex items-center justify-end gap-4 mb-10">
                <h2 className="text-3xl font-bold text-forest-dark uppercase tracking-widest border-b-2 border-moss pb-2">Opinie Gości</h2>
                <Star className="w-10 h-10 text-yellow-500 fill-yellow-500" />
              </div>
              <div className="bg-forest-green/[0.03] p-10 rounded-[3rem] border border-forest-green/10 relative">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-yellow-500 text-yellow-500" />)}
                </div>
                <p className="text-xl italic text-forest-dark mb-10 leading-relaxed font-serif">
                  "Niepowtarzalny klimat i smaki, których próżno szukać gdzie indziej. 
                  Prawdziwa gratka dla miłośników dobrej, zdrowej kuchni w samym sercu Gostynina."
                </p>
                <div className="flex items-center gap-4 mb-10 pb-10 border-b border-forest-green/10">
                  <div className="w-14 h-14 rounded-full bg-forest-green text-cream flex items-center justify-center font-bold text-xl shadow-lg">K</div>
                  <div>
                    <p className="font-bold text-lg">Kamil G.</p>
                    <p className="text-sm text-forest-light font-bold">Zadowolony Gość</p>
                  </div>
                </div>
                <a 
                  href={reviewsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-5 bg-white border-2 border-forest-green text-forest-green font-bold rounded-2xl hover:bg-forest-green hover:text-white transition-all text-center block shadow-sm hover:shadow-xl"
                >
                  Zobacz Wszystkie Opinie na Facebooku
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="kontakt" className="py-24 bg-cream relative">
        <div className="absolute bottom-0 left-0 p-12 opacity-5 pointer-events-none rotate-45">
          <PineTreeMini className="w-48 h-48" />
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div {...fadeIn} className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-forest-dark mb-6">Odwiedź Nas w Gostyninie</h2>
            <div className="max-w-3xl mx-auto w-16 h-1 bg-moss mb-12" />
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-white rounded-2xl shadow-md border-b-4 border-wood-medium">
                  <MapPin className="w-8 h-8 text-wood-medium" />
                </div>
                <span className="text-xl font-bold text-forest-dark">Floriańska 21</span>
                <span className="text-forest-light italic">09-500 Gostynin</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-white rounded-2xl shadow-md border-b-4 border-wood-medium">
                  <Phone className="w-8 h-8 text-wood-medium" />
                </div>
                <a href="tel:606455356" className="text-2xl font-black text-forest-dark hover:text-wood-medium transition-colors">606 455 356</a>
                <span className="text-forest-light italic">Zadzwoń i zarezerwuj</span>
              </div>
            </div>
          </motion.div>

          {/* Map Embed */}
          <motion.div 
            {...fadeIn}
            className="w-full h-[550px] rounded-[3rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.15)] border-[8px] border-white relative"
          >
             <div className="absolute top-4 left-4 z-10 hidden md:block">
                <PineSprig className="w-16 h-16 text-forest-green opacity-40" />
             </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2432.7501784992955!2d19.462195677115126!3d52.42932414293853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471b80d4bcad17a5%3A0x14e37bb46d18f692!2sFloria%C5%84ska%2021%2C%2009-500%20Gostynin!5e0!3m2!1spl!2spl!4v1778659498131!5m2!1spl!2spl" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest-dark text-cream pt-24 pb-12 relative overflow-hidden">
        {/* Treeline effect */}
        <div className="absolute top-0 left-0 w-full flex items-start justify-center gap-1 overflow-hidden opacity-20 pointer-events-none -translate-y-1/2">
           {[...Array(15)].map((_, i) => (
             <PineTreeMini key={i} className="w-24 md:w-48 h-auto flex-shrink-0" />
           ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-16 mb-20 items-center">
            <div className="flex items-center gap-4">
               <img 
                src="https://i.postimg.cc/mZ73V0B6/523497608-1620833512622454-8590443202565289874-n.jpg" 
                alt="Logo" 
                className="h-16 w-16 rounded-full border-2 border-moss shadow-xl"
              />
              <div className="text-left">
                <p className="font-serif text-2xl font-bold tracking-tight">Leśna Chata</p>
                <p className="text-xs text-moss font-bold tracking-[0.3em] uppercase">Kuchnia Myśliwska</p>
              </div>
            </div>
            
            <div className="flex justify-center gap-10">
               <div className="text-center group">
                 <p className="text-xs text-white/40 uppercase mb-4 tracking-[0.2em]">Znajdź nas</p>
                 <a href={fbUrl} target="_blank" rel="noopener noreferrer" className="hover:text-moss transition-all block transform group-hover:-translate-y-1">
                  <Facebook className="w-8 h-8 mx-auto" />
                </a>
               </div>
               <div className="text-center group">
                 <p className="text-xs text-white/40 uppercase mb-4 tracking-[0.2em]">Zadzwoń</p>
                 <a href="tel:606455356" className="hover:text-moss transition-all block transform group-hover:-translate-y-1">
                  <Phone className="w-8 h-8 mx-auto" />
                </a>
               </div>
            </div>

            <div className="text-right hidden md:block">
              <p className="font-serif text-lg leading-relaxed mb-2 opacity-80">"Smak Natury w Sercu Lasu"</p>
              <PineSprig className="w-8 h-8 text-moss ml-auto opacity-40 translate-x-4" />
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-white/40 font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} Leśna Chata. Gostynin, Polska.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
