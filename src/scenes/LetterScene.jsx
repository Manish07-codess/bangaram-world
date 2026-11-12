import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import TeddyBear from '../components/TeddyBear';
import Envelope from '../components/Envelope';

/* ---------- main component ---------- */
const LetterScene = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #2d1a42 0%, #241536 50%, #11152E 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px 20px 80px',
      }}
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(1.6rem, 5vw, 2.8rem)',
          color: '#FFB6D5',
          textShadow: '0 0 20px rgba(255,182,213,0.45)',
          marginBottom: 30,
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        {content.letter.title}
      </motion.h1>

      {/* Envelope */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{ zIndex: 2, width: '100%', maxWidth: 520, marginBottom: 10 }}
      >
        <Envelope
          letterContent={content.letter.body}
          title="A Little Something From My Heart 💌"
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
        />
      </motion.div>

      {/* Tap-to-open hint */}
      <AnimatePresence>
        {!isOpen && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '1rem',
              color: '#C8A2E8',
              marginTop: 8,
              zIndex: 2,
              cursor: 'pointer',
            }}
            onClick={() => setIsOpen(true)}
          >
            Tap to open 💌
          </motion.p>
        )}
      </AnimatePresence>

      {/* Teddy below the letter */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        style={{ marginTop: 24, zIndex: 2 }}
      >
        <TeddyBear mood="happy" size={120} />
      </motion.div>

      {/* Next button (visible after letter is opened) */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.07, boxShadow: '0 0 28px rgba(255,92,154,0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            style={{
              marginTop: 30,
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
        )}
      </AnimatePresence>
    </div>
  );
};

export default LetterScene;
