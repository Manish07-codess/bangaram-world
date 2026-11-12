import React from 'react';
import { motion } from 'framer-motion';

const PromiseCard = ({ text, index = 0, icon = '❤️' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay: index * 0.15,
        duration: 0.5,
        ease: 'easeOut',
      }}
      whileHover={{
        rotateY: 5,
        rotateX: -5,
        boxShadow: '0 8px 30px rgba(255, 92, 154, 0.4)',
      }}
      style={{
        background: 'rgba(255, 182, 213, 0.15)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 182, 213, 0.25)',
        borderRadius: 16,
        padding: '24px 20px',
        textAlign: 'center',
        cursor: 'default',
        transformStyle: 'preserve-3d',
        perspective: 600,
      }}
    >
      <div
        style={{
          fontSize: 32,
          marginBottom: 12,
        }}
      >
        {icon}
      </div>
      <p
        style={{
          color: '#FFF8FC',
          fontSize: 16,
          lineHeight: 1.6,
          margin: 0,
          fontWeight: 300,
        }}
      >
        {text}
      </p>
    </motion.div>
  );
};

export default PromiseCard;
