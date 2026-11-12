import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import TeddyBear from '../components/TeddyBear';

const teddyMoods = ['happy', 'nervous', 'excited'];

const MiniHeart = ({ id, startX, size, color, drift, targetY, duration }) => (
  <motion.div
    key={id}
    style={{
      position: 'absolute',
      left: `calc(50% + ${startX}px)`,
      bottom: '40%',
      fontSize: size,
      color,
      pointerEvents: 'none',
    }}
    initial={{ y: 0, opacity: 1, scale: 0.3 }}
    animate={{ y: targetY, opacity: 0, scale: 1, x: drift }}
    transition={{ duration, ease: 'easeOut' }}
  >
    ❤️
  </motion.div>
);

const FlirtyScene = ({ onNext }) => {
  const [currentLine, setCurrentLine] = useState(null);
  const [usedLines, setUsedLines] = useState(new Set());
  const [teddyMood, setTeddyMood] = useState('happy');
  const [moodIndex, setMoodIndex] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [heartBatchId, setHeartBatchId] = useState(0);

  const lines = content.flirty.lines;

  const handleBlush = useCallback(() => {
    let available = [];
    for (let i = 0; i < lines.length; i++) {
      if (!usedLines.has(i)) available.push(i);
    }
    if (available.length === 0) {
      setUsedLines(new Set());
      available = lines.map((_, i) => i);
    }
    const pick = available[Math.floor(Math.random() * available.length)];
    setCurrentLine(pick);
    setUsedLines((prev) => new Set([...prev, pick]));

    // Cycle teddy mood
    const nextIdx = (moodIndex + 1) % teddyMoods.length;
    setMoodIndex(nextIdx);
    setTeddyMood(teddyMoods[nextIdx]);

    // Spawn 5-8 hearts
    const colors = ['#FF5C9A', '#FFB6D5', '#C8A2E8', '#ff4081'];
    const batch = heartBatchId + 1;
    setHeartBatchId(batch);
    const count = 5 + Math.floor(Math.random() * 4);
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: `${batch}-${i}`,
      startX: -60 + Math.random() * 120,
      size: 14 + Math.random() * 14,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: -30 + Math.random() * 60,
      targetY: -250 - Math.random() * 150,
      duration: 1.5 + Math.random(),
    }));
    setHearts(newHearts);
  }, [lines, usedLines, moodIndex, heartBatchId]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #241536 0%, #3d1f5c 50%, #4a2468 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Title */}
      <motion.h1
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          color: '#FFB6D5',
          textAlign: 'center',
          marginBottom: 8,
          textShadow: '0 0 30px rgba(255, 92, 154, 0.4)',
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {content.flirty.title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(1rem, 3vw, 1.3rem)',
          color: '#C8A2E8',
          textAlign: 'center',
          marginBottom: 40,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {content.flirty.subtitle}
      </motion.p>

      {/* Teddy Bear */}
      <motion.div
        style={{ marginBottom: 30 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.6 }}
      >
        <TeddyBear mood={teddyMood} size={140} />
      </motion.div>

      {/* Flirt line display area */}
      <div
        style={{
          minHeight: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
          maxWidth: 500,
          marginBottom: 20,
        }}
      >
        <AnimatePresence mode="wait">
          {currentLine !== null && (
            <motion.p
              key={currentLine}
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                color: '#FFF8FC',
                textAlign: 'center',
                lineHeight: 1.6,
                padding: '0 10px',
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              "{lines[currentLine]}"
            </motion.p>
          )}
        </AnimatePresence>

        {/* Floating hearts from text area */}
        <AnimatePresence>
          {hearts.map((h) => (
            <MiniHeart key={h.id} {...h} />
          ))}
        </AnimatePresence>
      </div>

      {/* Blush button */}
      <motion.button
        onClick={handleBlush}
        style={{
          padding: '16px 40px',
          fontSize: 'clamp(1rem, 3vw, 1.2rem)',
          fontFamily: "'Dancing Script', cursive",
          background: 'linear-gradient(135deg, #FF5C9A, #C8A2E8)',
          color: '#FFF8FC',
          border: 'none',
          borderRadius: 50,
          cursor: 'pointer',
          boxShadow: '0 0 30px rgba(255, 92, 154, 0.5)',
          marginBottom: 40,
        }}
        whileHover={{ scale: 1.08, boxShadow: '0 0 40px rgba(255, 92, 154, 0.7)' }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {content.flirty.buttonText}
      </motion.button>

      {/* Next button */}
      <motion.button
        onClick={onNext}
        style={{
          padding: '14px 36px',
          fontSize: 'clamp(1rem, 3vw, 1.1rem)',
          fontFamily: "'Dancing Script', cursive",
          background: 'linear-gradient(135deg, #FF5C9A, #C8A2E8)',
          color: '#FFF8FC',
          border: 'none',
          borderRadius: 50,
          cursor: 'pointer',
          boxShadow: '0 0 20px rgba(255, 92, 154, 0.4)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Next ❤️
      </motion.button>
    </div>
  );
};

export default FlirtyScene;
