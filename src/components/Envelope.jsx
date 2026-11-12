import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Envelope = ({ letterContent = '', title = '', isOpen = false, onOpen }) => {
  const paragraphs = letterContent.split('\n').filter((p) => p.trim());

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 400,
        margin: '0 auto',
        perspective: 800,
      }}
    >
      {/* Envelope body */}
      <motion.div
        onClick={!isOpen ? onOpen : undefined}
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '71.4%', // ~1.4:1 aspect
          background: 'linear-gradient(135deg, #FFB6D5 0%, #FF5C9A 100%)',
          borderRadius: 8,
          cursor: !isOpen ? 'pointer' : 'default',
          boxShadow: '0 8px 30px rgba(255, 92, 154, 0.3)',
          overflow: 'visible',
        }}
        whileHover={!isOpen ? { scale: 1.03, boxShadow: '0 12px 40px rgba(255, 92, 154, 0.5)' } : {}}
        whileTap={!isOpen ? { scale: 0.98 } : {}}
      >
        {/* Flap */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50%',
            transformOrigin: 'top center',
            zIndex: isOpen ? 1 : 3,
          }}
          animate={{ rotateX: isOpen ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(180deg, #e8458a 0%, #FF5C9A 100%)',
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              borderRadius: '8px 8px 0 0',
            }}
          />
          {/* Heart seal */}
          <motion.div
            style={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 28,
              filter: 'drop-shadow(0 0 8px rgba(255, 92, 154, 0.6))',
              zIndex: 4,
            }}
            animate={{
              filter: [
                'drop-shadow(0 0 8px rgba(255, 92, 154, 0.4))',
                'drop-shadow(0 0 16px rgba(255, 92, 154, 0.8))',
                'drop-shadow(0 0 8px rgba(255, 92, 154, 0.4))',
              ],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            ❤️
          </motion.div>
        </motion.div>

        {/* Envelope interior (visible when open) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #f7d0de 0%, #f0b8cc 100%)',
            borderRadius: 8,
            zIndex: 0,
          }}
        />
      </motion.div>

      {/* Letter sliding out */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: -20, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            style={{
              position: 'relative',
              zIndex: 5,
              background: '#FFF8F0',
              borderRadius: 12,
              padding: '30px 24px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
              maxWidth: 380,
              margin: '0 auto',
            }}
          >
            {title && (
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  color: '#FF5C9A',
                  fontSize: 22,
                  textAlign: 'center',
                  marginBottom: 16,
                  marginTop: 0,
                }}
              >
                {title}
              </motion.h3>
            )}
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.3, duration: 0.4 }}
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  color: '#3a2a3e',
                  fontSize: 16,
                  lineHeight: 1.7,
                  margin: '0 0 12px 0',
                }}
              >
                {para}
              </motion.p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Envelope;
