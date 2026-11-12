import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Heart = ({ delay, x, size, duration, color }) => (
  <motion.div
    style={{
      position: 'absolute',
      bottom: -50,
      left: `${x}%`,
      fontSize: size,
      color,
      willChange: 'transform, opacity',
    }}
    initial={{ y: 0, opacity: 0.8 }}
    animate={{
      y: '-110vh',
      opacity: [0.8, 1, 0.6, 0],
      x: [0, 15, -15, 10, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    ❤️
  </motion.div>
);

const BurstHeart = ({ tx, ty, size, color, duration, delay }) => (
  <motion.div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      fontSize: size,
      color,
      pointerEvents: 'none',
    }}
    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
    animate={{ x: tx, y: ty, opacity: 0, scale: 0.3 }}
    transition={{ duration, delay, ease: 'easeOut' }}
  >
    ❤️
  </motion.div>
);

const FloatingHearts = ({ count = 15, burst = false }) => {
  const [hearts] = useState(() => {
    const colors = ['#FF5C9A', '#FFB6D5', '#C8A2E8', '#ff4081', '#ff6b9d'];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 12 + Math.random() * 24,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  });

  const [burstHearts] = useState(() => {
    const colors = ['#FF5C9A', '#FFB6D5', '#C8A2E8', '#ff4081'];
    return Array.from({ length: 30 }, (_, i) => {
      const angle = (i / 30) * 360 + Math.random() * 12;
      const distance = 200 + Math.random() * 300;
      const rad = (angle * Math.PI) / 180;
      return {
        id: `burst-${i}`,
        tx: Math.cos(rad) * distance,
        ty: Math.sin(rad) * distance,
        size: 14 + Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 1.2 + Math.random() * 0.8,
        delay: Math.random() * 0.3,
      };
    });
  });

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {hearts.map((h) => (
        <Heart key={h.id} {...h} />
      ))}
      <AnimatePresence>
        {burst &&
          burstHearts.map((bh) => <BurstHeart key={bh.id} {...bh} />)}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;
