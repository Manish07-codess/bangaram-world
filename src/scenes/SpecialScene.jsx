import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '../data/content';
import FloatingHearts from '../components/FloatingHearts';

/* ---------- card component ---------- */
const ReasonCard = ({ reason, index, isSelected, onSelect }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay: index * 0.2, ease: 'easeOut' }}
    whileHover={{ scale: 1.03 }}
    onClick={() => onSelect(index)}
    style={{
      background: 'rgba(255,255,255,0.08)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: isSelected
        ? '1.5px solid #FF5C9A'
        : '1px solid rgba(255,255,255,0.12)',
      borderRadius: 20,
      padding: 24,
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'border-color 0.3s, box-shadow 0.3s',
      boxShadow: isSelected
        ? '0 0 20px rgba(255,92,154,0.35)'
        : '0 4px 20px rgba(0,0,0,0.2)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform =
        'perspective(600px) rotateY(5deg) rotateX(-5deg)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'none';
    }}
  >
    <div style={{ fontSize: 32, marginBottom: 12 }}>{reason.icon}</div>
    <p
      style={{
        fontFamily: "'Dancing Script', cursive",
        fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
        color: '#FFF8FC',
        margin: 0,
        lineHeight: 1.6,
      }}
    >
      {reason.text}
    </p>
  </motion.div>
);

/* ---------- main component ---------- */
const SpecialScene = ({ onNext }) => {
  const [selected, setSelected] = useState(null);

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
      {/* background hearts */}
      <FloatingHearts count={8} />

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
          marginBottom: 32,
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        {content.special.title}
      </motion.h1>

      {/* Personal Teddy Drawing in Pastel Frame */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
        style={{
          position: 'relative',
          marginBottom: 42,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Glowing hearts around frame */}
        {[
          { top: -14, left: -16, delay: 0, symbol: '❤️', size: 22 },
          { top: 18, right: -20, delay: 0.6, symbol: '💖', size: 20 },
          { bottom: 44, left: -22, delay: 1.1, symbol: '💕', size: 20 },
          { bottom: 16, right: -16, delay: 1.6, symbol: '❤️', size: 22 },
        ].map((h, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: h.top,
              left: h.left,
              right: h.right,
              bottom: h.bottom,
              fontSize: h.size,
              pointerEvents: 'none',
              zIndex: 3,
              filter: 'drop-shadow(0 0 10px rgba(255, 92, 154, 0.8))',
            }}
            animate={{ y: [0, -8, 0], scale: [1, 1.15, 1], opacity: [0.75, 1, 0.75] }}
            transition={{ repeat: Infinity, duration: 2.8, delay: h.delay, ease: 'easeInOut' }}
          >
            {h.symbol}
          </motion.span>
        ))}

        {/* Gentle floating pastel frame */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut' }}
          style={{
            padding: 12,
            borderRadius: 26,
            background: 'linear-gradient(135deg, rgba(255, 182, 213, 0.4), rgba(200, 162, 232, 0.35))',
            border: '1.5px solid rgba(255, 182, 213, 0.55)',
            boxShadow:
              '0 14px 40px rgba(0, 0, 0, 0.35), 0 0 32px rgba(255, 92, 154, 0.32), inset 0 0 20px rgba(255, 248, 252, 0.15)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            maxWidth: 280,
            width: '82vw',
          }}
        >
          <div
            style={{
              borderRadius: 18,
              overflow: 'hidden',
              background: 'rgba(255, 248, 252, 0.06)',
            }}
          >
            <img
              src="./images/personal_art/bangaram-teddy.png"
              alt="A little something I drew just for you, Bangaram"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>
          <p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1.05rem, 3.2vw, 1.3rem)',
              color: '#FFF8FC',
              textAlign: 'center',
              margin: '12px 6px 4px',
              textShadow: '0 0 12px rgba(255, 182, 213, 0.45)',
              lineHeight: 1.4,
            }}
          >
            A little something I drew just for you, Bangaram 🧸❤️
          </p>
        </motion.div>
      </motion.div>

      {/* card grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 24,
          maxWidth: 900,
          width: '100%',
          zIndex: 2,
        }}
      >
        {content.special.reasons.map((reason, i) => (
          <ReasonCard
            key={i}
            reason={reason}
            index={i}
            isSelected={selected === i}
            onSelect={setSelected}
          />
        ))}
      </div>

      {/* next button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
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

export default SpecialScene;
