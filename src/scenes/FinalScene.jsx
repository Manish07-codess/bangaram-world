import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../data/content';
import TeddyBear from '../components/TeddyBear';
import FloatingHearts from '../components/FloatingHearts';

/* ── tiny helper components ────────────────────────────────── */

const TwinkleStar = ({ top, left, size, delay, duration }) => (
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
    animate={{ opacity: [0.1, 1, 0.1], scale: [1, 1.4, 1] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const FloatingPetal = ({ left, delay, duration, size }) => (
  <motion.div
    style={{
      position: 'absolute',
      bottom: -30,
      left: `${left}%`,
      fontSize: size,
      pointerEvents: 'none',
    }}
    animate={{
      y: [0, '-110vh'],
      x: [0, 20, -15, 10, -5],
      rotate: [0, 180, 360],
      opacity: [0.7, 0.9, 0.5, 0],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
  >
    🌸
  </motion.div>
);

const FloatingCloud = ({ top, left, width, delay, duration }) => (
  <motion.div
    style={{
      position: 'absolute',
      top: `${top}%`,
      left: `${left}%`,
      width,
      height: width * 0.4,
      borderRadius: '50%',
      background: 'rgba(255, 248, 252, 0.06)',
      pointerEvents: 'none',
      filter: 'blur(8px)',
    }}
    animate={{ x: [0, 40, 0] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const HeartExplosionParticle = ({ tx, ty, size, color, duration, delay: d }) => (
  <motion.div
    style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      fontSize: size,
      color,
      pointerEvents: 'none',
      zIndex: 100,
    }}
    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
    animate={{ x: tx, y: ty, opacity: 0, scale: 0.2 }}
    transition={{ duration, delay: d, ease: 'easeOut' }}
  >
    ❤️
  </motion.div>
);

/* ── main component ────────────────────────────────────────── */

const FinalScene = ({ onRestart }) => {
  const [hugged, setHugged] = useState(false);
  const [showRestartBtn, setShowRestartBtn] = useState(false);

  const [stars] = useState(() =>
    Array.from({ length: 55 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 1 + Math.random() * 3,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
    }))
  );

  const [petals] = useState(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      size: 18 + Math.random() * 10,
    }))
  );

  const [clouds] = useState(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      top: 10 + Math.random() * 30,
      left: Math.random() * 80,
      width: 120 + Math.random() * 100,
      delay: Math.random() * 5,
      duration: 20 + Math.random() * 15,
    }))
  );

  const [floatingHeartData] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 16,
      delay: Math.random() * 8,
      duration: 7 + Math.random() * 6,
    }))
  );

  const [heartExplosion] = useState(() => {
    const colors = ['#FF5C9A', '#FFB6D5', '#C8A2E8', '#ff4081'];
    return Array.from({ length: 40 }, (_, i) => {
      const angle = (i / 40) * 360 + Math.random() * 9;
      const dist = 200 + Math.random() * 350;
      const rad = (angle * Math.PI) / 180;
      return {
        id: i,
        tx: Math.cos(rad) * dist,
        ty: Math.sin(rad) * dist,
        size: 16 + Math.random() * 22,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 1.5 + Math.random(),
        delay: Math.random() * 0.4,
      };
    });
  });

  useEffect(() => {
    const img = new Image();
    img.src = './images/personal_art/miss-you-bangaram.png';
  }, []);

  useEffect(() => {
    if (hugged) {
      const timer = setTimeout(() => setShowRestartBtn(true), 3400);
      return () => clearTimeout(timer);
    }
  }, [hugged]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0e1f 0%, #11152E 30%, #1a1f3d 60%, #241536 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Pink/purple atmosphere overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at 50% 80%, rgba(92, 45, 130, 0.25) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Twinkling stars */}
      {stars.map((s) => (
        <TwinkleStar key={s.id} {...s} />
      ))}

      {/* Clouds */}
      {clouds.map((c) => (
        <FloatingCloud key={c.id} {...c} />
      ))}

      {/* Glowing moon */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          right: 50,
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FFF8FC 0%, #C8A2E8 30%, rgba(200,162,232,0.3) 60%, transparent 80%)',
          boxShadow: '0 0 80px rgba(200, 162, 232, 0.5), 0 0 150px rgba(200, 162, 232, 0.2)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating petals */}
      {petals.map((p) => (
        <FloatingPetal key={p.id} {...p} />
      ))}

      {/* Floating hearts background */}
      {floatingHeartData.map((h) => (
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
          animate={{ y: [0, '-110vh'], opacity: [0.5, 0.8, 0.3, 0], x: [0, 10, -10, 5] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
        >
          ❤️
        </motion.div>
      ))}

      {/* ── Pulsing heart above teddies ── */}
      <motion.div
        style={{
          fontSize: 48,
          color: '#FF5C9A',
          filter: 'drop-shadow(0 0 20px rgba(255,92,154,0.6))',
          marginBottom: 5,
          position: 'relative',
          zIndex: 2,
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        ❤️
      </motion.div>

      {/* ── Two teddies side by side (hugging once clicked) ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginBottom: 30,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {!hugged ? (
          <>
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 5 }}
              transition={{ duration: 1, type: 'spring' }}
            >
              <TeddyBear mood="happy" size={140} />
            </motion.div>
            <motion.div
              initial={{ x: 20 }}
              animate={{ x: -5 }}
              transition={{ duration: 1, type: 'spring' }}
              style={{ marginLeft: -16 }}
            >
              <TeddyBear mood="waving" size={140} />
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          >
            <TeddyBear mood="hugging" size={220} />
          </motion.div>
        )}
      </div>

      {/* ── Title ── */}
      <motion.h1
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 'clamp(2.5rem, 8vw, 4rem)',
          color: '#FFB6D5',
          textAlign: 'center',
          textShadow: '0 0 40px rgba(255, 92, 154, 0.5)',
          marginBottom: 20,
          position: 'relative',
          zIndex: 2,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {content.finale.title}
      </motion.h1>

      {/* ── Messages ── */}
      {content.finale.messages.map((msg, i) => (
        <motion.p
          key={i}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(1rem, 3vw, 1.4rem)',
            color: '#FFF8FC',
            textAlign: 'center',
            maxWidth: 550,
            lineHeight: 1.7,
            marginBottom: 12,
            position: 'relative',
            zIndex: 2,
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.6, duration: 0.7 }}
        >
          {msg}
        </motion.p>
      ))}

      {/* ── Hug button / hugged state ── */}
      {!hugged ? (
        <motion.button
          onClick={() => setHugged(true)}
          style={{
            padding: '18px 48px',
            fontSize: 'clamp(1.1rem, 3.5vw, 1.3rem)',
            fontFamily: "'Dancing Script', cursive",
            background: 'linear-gradient(135deg, #FF5C9A, #C8A2E8)',
            color: '#FFF8FC',
            border: 'none',
            borderRadius: 50,
            cursor: 'pointer',
            boxShadow: '0 0 30px rgba(255, 92, 154, 0.5)',
            marginTop: 30,
            position: 'relative',
            zIndex: 2,
          }}
          whileHover={{ scale: 1.08, boxShadow: '0 0 50px rgba(255, 92, 154, 0.8)' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + content.finale.messages.length * 0.6 + 0.3 }}
        >
          {content.finale.hugButton}
        </motion.button>
      ) : (
        <>
          {/* Heart explosion */}
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 99 }}>
            {heartExplosion.map((p) => (
              <HeartExplosionParticle key={p.id} {...p} />
            ))}
          </div>

          <FloatingHearts burst={true} />

          {/* Hug reaction */}
          <motion.p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              color: '#FFB6D5',
              textAlign: 'center',
              textShadow: '0 0 30px rgba(255, 92, 154, 0.5)',
              marginTop: 20,
              position: 'relative',
              zIndex: 2,
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: [0.3, 1.15, 1] }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            {content.finale.hugReaction}
          </motion.p>

          {/* Final Flower Drawing Reveal (after teddy hugging animation) */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.9, ease: 'easeOut' }}
            style={{
              position: 'relative',
              zIndex: 2,
              marginTop: 32,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: 360,
              width: '88vw',
            }}
          >
            {/* Soft pink radial glow aura */}
            <motion.div
              aria-hidden="true"
              animate={{ opacity: [0.55, 0.9, 0.55], scale: [0.97, 1.04, 0.97] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                inset: '-10%',
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(255, 92, 154, 0.38) 0%, rgba(200, 162, 232, 0.18) 50%, transparent 72%)',
                filter: 'blur(22px)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Floating sparkles around the flower drawing */}
            {[
              { top: -10, left: -8, delay: 0, size: 20 },
              { top: '18%', right: -14, delay: 0.5, size: 18 },
              { bottom: '28%', left: -14, delay: 1.0, size: 18 },
              { bottom: -8, right: -6, delay: 1.5, size: 22 },
              { top: '48%', right: -16, delay: 0.8, size: 16 },
            ].map((sp, i) => (
              <motion.span
                key={i}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: sp.top,
                  left: sp.left,
                  right: sp.right,
                  bottom: sp.bottom,
                  fontSize: sp.size,
                  pointerEvents: 'none',
                  zIndex: 3,
                  filter: 'drop-shadow(0 0 8px rgba(255, 182, 213, 0.9))',
                }}
                animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4], scale: [0.85, 1.2, 0.85] }}
                transition={{ repeat: Infinity, duration: 2.6, delay: sp.delay, ease: 'easeInOut' }}
              >
                ✨
              </motion.span>
            ))}

            {/* Original flower drawing (aspect ratio preserved, no cropping/stretching) */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: 22,
                padding: 8,
                background: 'linear-gradient(135deg, rgba(255, 92, 154, 0.32), rgba(200, 162, 232, 0.28))',
                border: '1.5px solid rgba(255, 182, 213, 0.45)',
                boxShadow:
                  '0 16px 45px rgba(0, 0, 0, 0.45), 0 0 38px rgba(255, 92, 154, 0.42)',
                width: '100%',
              }}
            >
              <img
                src="./images/personal_art/miss-you-bangaram.png"
                alt="I Miss You, Bangaram flower drawing"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: 16,
                }}
              />
            </div>

            {/* Captions below flower drawing */}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.0, duration: 0.7 }}
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(1.6rem, 5vw, 2.3rem)',
                color: '#FFB6D5',
                textAlign: 'center',
                textShadow: '0 0 20px rgba(255, 92, 154, 0.6)',
                marginTop: 20,
                marginBottom: 8,
                position: 'relative',
                zIndex: 2,
              }}
            >
              I Miss You, Bangaram ❤️
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.7 }}
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: 'clamp(1.1rem, 3.4vw, 1.45rem)',
                color: '#FFF8FC',
                textAlign: 'center',
                textShadow: '0 0 14px rgba(200, 162, 232, 0.45)',
                margin: 0,
                position: 'relative',
                zIndex: 2,
              }}
            >
              Sending you all my love, one flower at a time. 💐
            </motion.p>
          </motion.div>

          {/* Start Over button (appears after reveal) */}
          <AnimatePresence>
            {showRestartBtn && (
              <motion.button
                onClick={onRestart}
                style={{
                  padding: '14px 36px',
                  fontSize: 'clamp(1rem, 3vw, 1.1rem)',
                  fontFamily: "'Dancing Script', cursive",
                  background: 'linear-gradient(135deg, #C8A2E8, #FF5C9A)',
                  color: '#FFF8FC',
                  border: 'none',
                  borderRadius: 50,
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(200, 162, 232, 0.5)',
                  marginTop: 30,
                  position: 'relative',
                  zIndex: 2,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Over 🔄
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default FinalScene;
