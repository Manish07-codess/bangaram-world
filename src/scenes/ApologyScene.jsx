import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import TeddyBear from '../components/TeddyBear';
import FloatingHearts from '../components/FloatingHearts';
import MovingButton from '../components/MovingButton';

/* ---------- helpers ---------- */
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
});

/* ---------- shared wrapper (defined outside component to avoid remounts) ---------- */
const Wrapper = ({ children }) => (
  <div
    style={{
      position: 'relative',
      width: '100vw',
      minHeight: '100vh',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #241536 0%, #11152E 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '60px 20px 40px',
        maxWidth: 600,
        width: '100%',
      }}
    >
      {children}
    </div>
  </div>
);

/* ---------- main component ---------- */
const ApologyScene = ({ onNext, onResult }) => {
  const [phase, setPhase] = useState('reading'); // 'reading' | 'forgiven' | 'waiting'
  const [typingDone, setTypingDone] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showContinue, setShowContinue] = useState(false);
  const intervalRef = useRef(null);
  const forgiveBtnRef = useRef(null);

  const fullMessage = content.apology.message;

  /* typing animation */
  useEffect(() => {
    if (phase !== 'reading') return;
    let idx = 0;
    intervalRef.current = setInterval(() => {
      idx += 1;
      setDisplayedText(fullMessage.slice(0, idx));
      if (idx >= fullMessage.length) {
        clearInterval(intervalRef.current);
        setTypingDone(true);
      }
    }, 30);
    return () => clearInterval(intervalRef.current);
  }, [phase, fullMessage]);

  /* delayed continue buttons for forgiven / waiting */
  useEffect(() => {
    if (phase === 'forgiven') {
      const t = setTimeout(() => setShowContinue(true), 3000);
      return () => clearTimeout(t);
    }
    if (phase === 'waiting') {
      const t = setTimeout(() => setShowContinue(true), 2000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  /* ---- handlers ---- */
  const handleForgive = () => {
    setPhase('forgiven');
    setShowContinue(false);
    onResult?.({ forgiven: true });
  };

  const handleNeedTime = () => {
    setPhase('waiting');
    setShowContinue(false);
    onResult?.({ forgiven: false });
  };

  /* ===== PHASE: READING ===== */
  if (phase === 'reading') {
    return (
      <Wrapper>
        {/* Teddy holding heart */}
        <motion.div {...fadeIn(0)} style={{ position: 'relative', marginBottom: 16 }}>
          <TeddyBear mood="sad" size={150} holdingHeart={true} />
        </motion.div>

        {/* Title */}
        <motion.h1
          {...fadeIn(0.2)}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(1.6rem, 5vw, 2.8rem)',
            color: '#FFB6D5',
            margin: '0 0 20px',
            textShadow: '0 0 18px rgba(255,182,213,0.4)',
          }}
        >
          {content.apology.title}
        </motion.h1>

        {/* Typing message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(0.95rem, 2.8vw, 1.2rem)',
            color: '#FFF8FC',
            lineHeight: 1.8,
            whiteSpace: 'pre-line',
            marginBottom: 30,
            minHeight: 180,
            textAlign: 'left',
            maxWidth: 500,
          }}
        >
          {displayedText}
          {!typingDone && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.6 }}
              style={{ display: 'inline-block', marginLeft: 2 }}
            >
              |
            </motion.span>
          )}
        </motion.div>

        {/* Buttons (appear after typing finishes) */}
        <AnimatePresence>
          {typingDone && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'relative',
                minHeight: 120,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}
            >
              {/* Forgive button */}
              <motion.button
                ref={forgiveBtnRef}
                whileHover={{ scale: 1.06, boxShadow: '0 0 25px rgba(255,92,154,0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleForgive}
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: 'clamp(0.95rem, 2.8vw, 1.15rem)',
                  padding: '12px 34px',
                  border: 'none',
                  borderRadius: 50,
                  cursor: 'pointer',
                  color: '#FFF8FC',
                  background: 'linear-gradient(135deg, #FF5C9A, #C8A2E8)',
                  boxShadow: '0 0 18px rgba(255,92,154,0.35)',
                  outline: 'none',
                }}
              >
                {content.apology.forgiveButton}
              </motion.button>

              {/* "I need time" — moves playfully once, then settles */}
              <MovingButton
                text={content.apology.timeButton}
                maxMoves={1}
                returnAfterSingleMove={true}
                avoidRef={forgiveBtnRef}
                onEventualClick={handleNeedTime}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Wrapper>
    );
  }

  /* ===== PHASE: FORGIVEN ===== */
  if (phase === 'forgiven') {
    return (
      <Wrapper>
        <FloatingHearts burst={true} />

        <motion.div {...fadeIn(0)} style={{ marginBottom: 16 }}>
          <TeddyBear mood="excited" size={180} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: [1, 1.08, 1] }}
          transition={{ duration: 0.8, scale: { repeat: Infinity, duration: 1.2 } }}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(1.6rem, 5vw, 2.8rem)',
            color: '#FFB6D5',
            margin: '0 0 24px',
            textShadow: '0 0 20px rgba(255,182,213,0.5)',
          }}
        >
          {content.apology.forgiveReaction.title}
        </motion.h1>

        <AnimatePresence>
          {showContinue && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: '1.1rem',
                padding: '12px 34px',
                border: 'none',
                borderRadius: 50,
                cursor: 'pointer',
                color: '#FFF8FC',
                background: 'linear-gradient(135deg, #FF5C9A, #C8A2E8)',
                boxShadow: '0 0 18px rgba(255,92,154,0.35)',
                outline: 'none',
              }}
            >
              Continue ❤️
            </motion.button>
          )}
        </AnimatePresence>
      </Wrapper>
    );
  }

  /* ===== PHASE: WAITING ===== */
  return (
    <Wrapper>
      <motion.div {...fadeIn(0)} style={{ marginBottom: 16 }}>
        <TeddyBear mood="crying" size={150} />
      </motion.div>

      <motion.h1
        {...fadeIn(0.2)}
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(1.4rem, 4.5vw, 2.4rem)',
          color: '#FFB6D5',
          margin: '0 0 12px',
          textShadow: '0 0 18px rgba(255,182,213,0.4)',
        }}
      >
        {content.apology.timeReaction.title}
      </motion.h1>

      <motion.p
        {...fadeIn(0.8)}
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
          color: '#C8A2E8',
          margin: '0 0 30px',
        }}
      >
        {content.apology.timeReaction.subtitle}
      </motion.p>

      <AnimatePresence>
        {showContinue && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '1.1rem',
              padding: '12px 34px',
              border: 'none',
              borderRadius: 50,
              cursor: 'pointer',
              color: '#FFF8FC',
              background: 'linear-gradient(135deg, #FF5C9A, #C8A2E8)',
              boxShadow: '0 0 18px rgba(255,92,154,0.35)',
              outline: 'none',
            }}
          >
            Continue exploring ❤️
          </motion.button>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default ApologyScene;
