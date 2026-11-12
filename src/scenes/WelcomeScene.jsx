import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../data/content';
import TeddyBear from '../components/TeddyBear';
import FloatingHearts from '../components/FloatingHearts';

/* ---------- tiny helpers ---------- */
const randomBetween = (min, max) => Math.random() * (max - min) + min;

/* ---------- keyframe injection (once) ---------- */
const styleId = 'welcome-scene-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
  const sheet = document.createElement('style');
  sheet.id = styleId;
  sheet.textContent = `
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; }
      50%      { opacity: 1; }
    }
    @keyframes floatCloud {
      0%   { transform: translateX(-120px); }
      100% { transform: translateX(calc(100vw + 120px)); }
    }
  `;
  document.head.appendChild(sheet);
}

/* ---------- pre-computed data ---------- */
const stars = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  top: `${randomBetween(2, 95)}%`,
  left: `${randomBetween(2, 98)}%`,
  size: randomBetween(2, 4),
  delay: `${randomBetween(0, 5).toFixed(2)}s`,
  duration: `${randomBetween(2, 5).toFixed(2)}s`,
}));

const clouds = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  top: `${randomBetween(5, 35)}%`,
  width: randomBetween(100, 200),
  height: randomBetween(40, 70),
  duration: `${randomBetween(30, 60).toFixed(0)}s`,
  delay: `${randomBetween(0, 20).toFixed(0)}s`,
}));

/* ---------- sub-components ---------- */
const Star = ({ s }) => (
  <div
    style={{
      position: 'absolute',
      top: s.top,
      left: s.left,
      width: s.size,
      height: s.size,
      borderRadius: '50%',
      background: '#fff',
      animation: `twinkle ${s.duration} ease-in-out ${s.delay} infinite`,
    }}
  />
);

const Moon = () => (
  <div
    style={{
      position: 'absolute',
      top: '8%',
      right: '12%',
      width: 80,
      height: 80,
      borderRadius: '50%',
      background: '#FFF8DC',
      boxShadow: '0 0 40px 15px rgba(255,248,220,0.45), 0 0 80px 40px rgba(255,248,220,0.2)',
      zIndex: 1,
    }}
  />
);

const Cloud = ({ c }) => (
  <div
    style={{
      position: 'absolute',
      top: c.top,
      left: -120,
      width: c.width,
      height: c.height,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.15)',
      filter: 'blur(6px)',
      animation: `floatCloud ${c.duration} linear ${c.delay} infinite`,
      zIndex: 0,
    }}
  />
);

/* ---------- animation variants ---------- */
const fadeInUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
});

/* ---------- main component ---------- */
const WelcomeScene = ({ onNext }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, #241536 0%, #11152E 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* --- background layers --- */}
      {stars.map((s) => (
        <Star key={s.id} s={s} />
      ))}
      <Moon />
      {clouds.map((c) => (
        <Cloud key={c.id} c={c} />
      ))}

      {/* floating hearts (background) */}
      <FloatingHearts count={8} />

      {/* --- center content --- */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '40px 20px',
          maxWidth: 600,
        }}
      >
        {/* Teddy with small surrounding hearts */}
        <motion.div
          {...fadeInUp(0)}
          style={{ position: 'relative', marginBottom: 20 }}
        >
          <TeddyBear mood="waving" size={180} />
          {/* tiny hearts around the teddy */}
          {[
            { top: 10, left: -20, delay: 0 },
            { top: -10, left: 60, delay: 0.5 },
            { top: 40, left: 190, delay: 1.0 },
            { top: 140, left: -15, delay: 1.5 },
          ].map((h, i) => (
            <motion.span
              key={i}
              style={{
                position: 'absolute',
                top: h.top,
                left: h.left,
                fontSize: 16,
                pointerEvents: 'none',
              }}
              animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                delay: h.delay,
                ease: 'easeInOut',
              }}
            >
              ❤️
            </motion.span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          {...fadeInUp(0.3)}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            color: '#FFB6D5',
            margin: '0 0 12px',
            textShadow: '0 0 20px rgba(255,182,213,0.5)',
          }}
        >
          {content.welcome.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          {...fadeInUp(0.8)}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(1rem, 3vw, 1.4rem)',
            color: '#FFF8FC',
            margin: '0 0 10px',
            opacity: 0.9,
          }}
        >
          {content.welcome.subtitle}
        </motion.p>

        {/* CTA text */}
        <motion.p
          {...fadeInUp(1.4)}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
            color: '#C8A2E8',
            margin: '0 0 30px',
            opacity: 0.85,
          }}
        >
          {content.welcome.cta}
        </motion.p>

        {/* Glow button */}
        <motion.button
          {...fadeInUp(2.0)}
          whileHover={{ scale: 1.07, boxShadow: '0 0 30px rgba(255,92,154,0.6)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(1rem, 3vw, 1.3rem)',
            padding: '14px 40px',
            border: 'none',
            borderRadius: 50,
            cursor: 'pointer',
            color: '#FFF8FC',
            background: 'linear-gradient(135deg, #FF5C9A, #C8A2E8)',
            boxShadow: '0 0 20px rgba(255,92,154,0.4)',
            outline: 'none',
          }}
        >
          {content.welcome.buttonText}
        </motion.button>
      </div>
    </div>
  );
};

export default WelcomeScene;
