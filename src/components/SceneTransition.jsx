import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  forward: {
    initial: { opacity: 0, x: 100, y: 20 },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -100, y: -20 },
  },
  back: {
    initial: { opacity: 0, x: -100, y: 20 },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 100, y: -20 },
  },
};

const SceneTransition = ({ children, direction = 'forward' }) => {
  const v = variants[direction] || variants.forward;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={children?.key || direction}
        initial={v.initial}
        animate={v.animate}
        exit={v.exit}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        style={{ width: '100%', minHeight: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default SceneTransition;
