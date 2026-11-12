import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TEDDY_ASSETS = {
  waving: './images/teddy/teddy-waving.png',
  smiling: './images/teddy/teddy-smiling.png',
  sad: './images/teddy/teddy-sad.png',
  crying: './images/teddy/teddy-crying.png',
  jumping: './images/teddy/teddy-jumping.png',
  heart: './images/teddy/teddy-heart.png',
  hugging: './images/teddy/teddy-hugging.png',
};

const TEDDY_LABELS = {
  waving: 'Cute baby plush teddy bear waving hello',
  smiling: 'Cute baby plush teddy bear smiling',
  sad: 'Cute baby plush teddy bear looking sad',
  crying: 'Cute baby plush teddy bear crying with tears',
  jumping: 'Cute baby plush teddy bear jumping happily',
  heart: 'Cute baby plush teddy bear holding a glowing heart',
  hugging: 'Two cute baby plush teddy bears hugging',
};

function resolvePose(mood, holdingHeart) {
  if (holdingHeart || mood === 'heart') return 'heart';
  switch (mood) {
    case 'waving':
      return 'waving';
    case 'excited':
    case 'jumping':
      return 'jumping';
    case 'sad':
      return 'sad';
    case 'crying':
      return 'crying';
    case 'hugging':
      return 'hugging';
    case 'happy':
    case 'nervous':
    case 'blinking':
    case 'default':
    default:
      return 'smiling';
  }
}

function getPoseMotion(mood, pose) {
  if (mood === 'nervous') {
    return {
      animate: { x: [-2.5, 2.5, -2.5, 2.5, 0], y: [0, -3, 0] },
      transition: { repeat: Infinity, duration: 0.55, ease: 'easeInOut' },
    };
  }
  switch (pose) {
    case 'waving':
      return {
        animate: { y: [0, -6, 0], rotate: [-1.5, 2.5, -1.5] },
        transition: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
      };
    case 'jumping':
      return {
        animate: { y: [0, -18, 0], rotate: [-2.5, 2.5, -2.5] },
        transition: { repeat: Infinity, duration: 0.65, ease: 'easeInOut' },
      };
    case 'sad':
      return {
        animate: { y: [0, 3, 0], rotate: [-1.5, 0, -1.5] },
        transition: { repeat: Infinity, duration: 2.8, ease: 'easeInOut' },
      };
    case 'crying':
      return {
        animate: { x: [-1.5, 1.5, -1.5, 0], y: [0, 2.5, 0] },
        transition: { repeat: Infinity, duration: 0.9, ease: 'easeInOut' },
      };
    case 'hugging':
      return {
        animate: { scale: [1, 1.035, 1], y: [0, -4, 0] },
        transition: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' },
      };
    case 'heart':
      return {
        animate: { y: [0, -5, 0], scale: [1, 1.02, 1] },
        transition: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' },
      };
    case 'smiling':
    default:
      return {
        animate: { y: [0, -6, 0], scale: [1, 1.015, 1] },
        transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
      };
  }
}

let preloaded = false;

const TeddyBear = ({ mood = 'default', size = 200, holdingHeart = false, style = {} }) => {
  useEffect(() => {
    if (preloaded || typeof window === 'undefined') return;
    preloaded = true;
    Object.values(TEDDY_ASSETS).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const pose = resolvePose(mood, holdingHeart);
  const src = TEDDY_ASSETS[pose];
  const alt = TEDDY_LABELS[pose];
  const motionProps = getPoseMotion(mood, pose);
  const isPair = pose === 'hugging';
  const displayWidth = isPair ? Math.round(size * 1.25) : size;
  const displayHeight = Math.round(size * 1.1);

  return (
    <motion.div
      style={{
        position: 'relative',
        width: displayWidth,
        height: displayHeight,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        ...style,
      }}
      {...motionProps}
    >
      {/* Soft ambient aura behind the plush teddy */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '12%',
          borderRadius: '50%',
          background:
            pose === 'heart' || pose === 'hugging'
              ? 'radial-gradient(circle, rgba(255, 92, 154, 0.35) 0%, rgba(200, 162, 232, 0.14) 55%, transparent 75%)'
              : 'radial-gradient(circle, rgba(255, 182, 213, 0.2) 0%, transparent 70%)',
          filter: 'blur(14px)',
          pointerEvents: 'none',
        }}
      />

      <AnimatePresence mode="wait">
        <motion.img
          key={pose}
          src={src}
          alt={alt}
          draggable={false}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            filter:
              pose === 'heart'
                ? 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 18px rgba(255, 92, 154, 0.35))'
                : 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.45))',
          }}
        />
      </AnimatePresence>
    </motion.div>
  );
};

export default TeddyBear;
