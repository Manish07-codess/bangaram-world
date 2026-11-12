import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import TeddyBear from '../components/TeddyBear';
import FloatingHearts from '../components/FloatingHearts';
import MovingButton from '../components/MovingButton';

/* ── tiny helper components ────────────────────────────────── */

const SparkleParticle = ({ top, left, size, delay, duration }) => (
  <motion.div
    style={{
      position: 'absolute',
      top: `${top}%`,
      left: `${left}%`,
      width: size,
      height: size,
      borderRadius: '50%',
      background: '#FFF8FC',
      pointerEvents: 'none',
    }}
    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
    transition={{ duration, delay, repeat: Infinity }}
  />
);

const BurstParticle = ({ tx, ty, color, size, duration, delay: d }) => (
  <motion.div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 6px ${color}`,
      pointerEvents: 'none',
    }}
    initial={{ x: 0, y: 0, opacity: 1 }}
    animate={{ x: tx, y: ty, opacity: 0 }}
    transition={{ duration, delay: d, ease: 'easeOut' }}
  />
);

/* ── main component ────────────────────────────────────────── */

const AskOutScene = ({ onNext, onResult }) => {
  const [phase, setPhase] = useState('asking');
  const [noMoveCount, setNoMoveCount] = useState(0);
  const [teddyReaction, setTeddyReaction] = useState('');
  const yesBtnRef = useRef(null);

  const [sparkles] = useState(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 1 + Math.random() * 3,
      delay: Math.random() * 5,
      duration: 1.5 + Math.random() * 2,
    }))
  );

  const [burstParticles] = useState(() => {
    const colors = ['#FFB6D5', '#C8A2E8', '#FF5C9A', '#FFF8FC', '#ff4081'];
    return Array.from({ length: 35 }, (_, i) => {
      const angle = (i / 35) * 360 + Math.random() * 10;
      const dist = 150 + Math.random() * 250;
      const rad = (angle * Math.PI) / 180;
      return {
        id: i,
        tx: Math.cos(rad) * dist,
        ty: Math.sin(rad) * dist,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 6,
        duration: 1 + Math.random(),
        delay: Math.random() * 0.4,
      };
    });
  });

  const [floatingHearts] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      size: 16 + Math.random() * 18,
      delay: Math.random() * 6,
      duration: 6 + Math.random() * 6,
    }))
  );

  const handleYes = () => {
    setPhase('yes');
    if (onResult) onResult({ saidYes: true });
  };

  const handleNo = () => {
    setPhase('no');
    if (onResult) onResult({ saidYes: false });
  };

  const handleNoMove = () => {
    const idx = noMoveCount % content.askOut.teddyReactions.length;
    setTeddyReaction(content.askOut.teddyReactions[idx]);
    setNoMoveCount((c) => c + 1);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #241536 0%, #3d1f5c 40%, #5c2d82 70%, #241536 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sparkle particles */}
      {sparkles.map((s) => (
        <SparkleParticle
          key={s.id}
          top={s.top}
          left={s.left}
          size={s.size}
          delay={s.delay}
          duration={s.duration}
        />
      ))}

      {/* Floating hearts background */}
      {floatingHearts.map((h) => (
        <motion.div
          key={h.id}
          style={{
            position: 'absolute',
            left: `${h.left}%`,
            bottom: -40,
            fontSize: h.size,
            color: '#FF5C9A',
            pointerEvents: 'none',
          }}
          animate={{ y: [0, '-110vh'], opacity: [0.6, 0.9, 0.4, 0], x: [0, 15, -10, 0] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
        >
          ❤️
        </motion.div>
      ))}

      {/* Glowing moon */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          right: 40,
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FFF8FC 0%, #C8A2E8 40%, transparent 70%)',
          boxShadow: '0 0 60px rgba(200, 162, 232, 0.6), 0 0 120px rgba(200, 162, 232, 0.3)',
          pointerEvents: 'none',
        }}
      />

      {/* ─── PHASE: ASKING ─── */}
      {phase === 'asking' && (
        <>
          {/* Two teddies side by side */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: 10,
              marginBottom: 10,
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Left teddy (nervous, slowly approaches holding glowing heart) */}
            <motion.div
              animate={{ x: [0, 18, 12] }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            >
              <TeddyBear mood="nervous" size={140} holdingHeart={true} />
            </motion.div>

            {/* Pulsing heart between */}
            <motion.div
              style={{
                fontSize: 36,
                color: '#FF5C9A',
                filter: 'drop-shadow(0 0 15px rgba(255,92,154,0.7))',
                alignSelf: 'center',
              }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              ❤️
            </motion.div>

            {/* Right teddy (default) */}
            <TeddyBear mood="default" size={140} />
          </div>

          {/* Teddy reaction text */}
          <div style={{ minHeight: 50, marginBottom: 10, position: 'relative', zIndex: 2 }}>
            <AnimatePresence mode="wait">
              {teddyReaction && (
                <motion.p
                  key={teddyReaction}
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                    color: '#FFB6D5',
                    textAlign: 'center',
                  }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  {teddyReaction}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Title */}
          <motion.h1
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              color: '#FFB6D5',
              textAlign: 'center',
              marginBottom: 8,
              textShadow: '0 0 30px rgba(255, 92, 154, 0.4)',
              position: 'relative',
              zIndex: 2,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            {content.askOut.title}
          </motion.h1>

          {/* Question */}
          <motion.p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
              color: '#C8A2E8',
              textAlign: 'center',
              marginBottom: 28,
              position: 'relative',
              zIndex: 2,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            {content.askOut.question}
          </motion.p>

          {/* Buttons container */}
          <div
            style={{
              position: 'relative',
              minHeight: 140,
              width: '100%',
              maxWidth: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 24,
              zIndex: 3,
            }}
          >
            {/* YES button — stationary */}
            <motion.button
              ref={yesBtnRef}
              onClick={handleYes}
              style={{
                padding: '18px 48px',
                fontSize: 'clamp(1.1rem, 3.5vw, 1.4rem)',
                fontFamily: "'Dancing Script', cursive",
                background: 'linear-gradient(135deg, #FF5C9A, #C8A2E8)',
                color: '#FFF8FC',
                border: 'none',
                borderRadius: 50,
                cursor: 'pointer',
                boxShadow: '0 0 30px rgba(255, 92, 154, 0.6)',
                zIndex: 4,
              }}
              whileHover={{ scale: 1.1, boxShadow: '0 0 50px rgba(255, 92, 154, 0.8)' }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              {content.askOut.yesButton}
            </motion.button>

            {/* NO button — dodges 6 times, avoids YES button & screen edges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <MovingButton
                text={content.askOut.noButton}
                maxMoves={6}
                avoidRef={yesBtnRef}
                onMove={handleNoMove}
                onEventualClick={handleNo}
              />
            </motion.div>
          </div>
        </>
      )}

      {/* ─── PHASE: YES ─── */}
      {phase === 'yes' && (
        <>
          <FloatingHearts burst={true} />

          {/* Sparkle explosion */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            {burstParticles.map((p) => (
              <BurstParticle
                key={p.id}
                tx={p.tx}
                ty={p.ty}
                color={p.color}
                size={p.size}
                duration={p.duration}
                delay={p.delay}
              />
            ))}
          </div>

          {/* Two hugging teddies */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 14 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              position: 'relative',
              zIndex: 2,
            }}
          >
            <TeddyBear mood="hugging" size={210} />
          </motion.div>

          {/* Title — bounce in */}
          <motion.h1
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              color: '#FFB6D5',
              textAlign: 'center',
              textShadow: '0 0 40px rgba(255, 92, 154, 0.6)',
              position: 'relative',
              zIndex: 2,
              marginBottom: 10,
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0 }}
          >
            {content.askOut.yesReaction.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1.3rem, 4vw, 2rem)',
              color: '#C8A2E8',
              textAlign: 'center',
              position: 'relative',
              zIndex: 2,
              marginBottom: 10,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {content.askOut.yesReaction.subtitle}
          </motion.p>

          {/* Message */}
          <motion.p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1rem, 3vw, 1.4rem)',
              color: '#FFF8FC',
              textAlign: 'center',
              position: 'relative',
              zIndex: 2,
              marginBottom: 10,
              maxWidth: 500,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {content.askOut.yesReaction.message}
          </motion.p>

          {/* Closing — with glow */}
          <motion.p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)',
              color: '#FF5C9A',
              textAlign: 'center',
              textShadow: '0 0 20px rgba(255, 92, 154, 0.6)',
              position: 'relative',
              zIndex: 2,
              marginBottom: 40,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {content.askOut.yesReaction.closing}
          </motion.p>

          {/* Continue button */}
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
              position: 'relative',
              zIndex: 2,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            Continue ❤️
          </motion.button>
        </>
      )}

      {/* ─── PHASE: NO ─── */}
      {phase === 'no' && (
        <>
          <motion.div
            style={{ marginBottom: 30, position: 'relative', zIndex: 2 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring' }}
          >
            <TeddyBear mood="sad" size={160} />
          </motion.div>

          <motion.h1
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              color: '#FFB6D5',
              textAlign: 'center',
              marginBottom: 10,
              textShadow: '0 0 30px rgba(255, 92, 154, 0.4)',
              position: 'relative',
              zIndex: 2,
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {content.askOut.noReaction.title}
          </motion.h1>

          <motion.p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1rem, 3vw, 1.3rem)',
              color: '#C8A2E8',
              textAlign: 'center',
              marginBottom: 40,
              maxWidth: 500,
              position: 'relative',
              zIndex: 2,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {content.askOut.noReaction.subtitle}
          </motion.p>

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
              position: 'relative',
              zIndex: 2,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Continue ❤️
          </motion.button>
        </>
      )}
    </div>
  );
};

export default AskOutScene;
