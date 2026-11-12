import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { content } from '../data/content';
import PromiseCard from '../components/PromiseCard';

/* ---------- star particles ---------- */
const randomBetween = (min, max) => Math.random() * (max - min) + min;

const styleId = 'promise-scene-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
  const sheet = document.createElement('style');
  sheet.id = styleId;
  sheet.textContent = `
    @keyframes promiseTwinkle {
      0%, 100% { opacity: 0.2; }
      50%      { opacity: 0.9; }
    }
  `;
  document.head.appendChild(sheet);
}

const stars = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  top: `${randomBetween(2, 98)}%`,
  left: `${randomBetween(2, 98)}%`,
  size: randomBetween(1.5, 3.5),
  delay: `${randomBetween(0, 6).toFixed(2)}s`,
  duration: `${randomBetween(2, 5).toFixed(2)}s`,
}));

/* ---------- main component ---------- */
const PromiseScene = ({ onNext }) => {
  const icons = useMemo(
    () => content.promises.items.map((_, i) => (i % 2 === 0 ? '❤️' : '🧸')),
    []
  );

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #241536 0%, #11152E 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 20px 80px',
      }}
    >
      {/* star particles */}
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: '#fff',
            animation: `promiseTwinkle ${s.duration} ease-in-out ${s.delay} infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          color: '#FFB6D5',
          textShadow: '0 0 22px rgba(255,182,213,0.5)',
          marginBottom: 40,
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        {content.promises.title}
      </motion.h1>

      {/* promise cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          maxWidth: 560,
          width: '100%',
          zIndex: 2,
        }}
      >
        {content.promises.items.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
          >
            <PromiseCard text={text} index={i} icon={icons[i]} />
          </motion.div>
        ))}
      </div>

      {/* next button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        whileHover={{ scale: 1.07, boxShadow: '0 0 28px rgba(255,92,154,0.5)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        style={{
          marginTop: 50,
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          padding: '12px 36px',
          border: 'none',
          borderRadius: 50,
          cursor: 'pointer',
          color: '#FFF8FC',
          background: 'linear-gradient(135deg, #FF5C9A, #C8A2E8)',
          boxShadow: '0 0 18px rgba(255,92,154,0.35)',
          outline: 'none',
          zIndex: 2,
        }}
      >
        Next ❤️
      </motion.button>
    </div>
  );
};

export default PromiseScene;
