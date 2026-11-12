import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const MovingButton = ({
  text,
  label,
  maxMoves = 5,
  onEventualClick,
  onClick,
  onMove,
  containerRef,
  avoidRef,
  returnAfterSingleMove = false,
  style = {},
}) => {
  const displayLabel = text ?? label ?? 'NO';
  const clickHandler = onEventualClick ?? onClick;

  const [moveCount, setMoveCount] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isSettled, setIsSettled] = useState(false);

  const buttonRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const lastMoveTimeRef = useRef(0);
  const settleTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    };
  }, []);

  const handleEvade = useCallback(
    (e) => {
      if (isSettled || moveCount >= maxMoves) return;

      // Prevent mouseEnter + touchStart double-firing on mobile taps
      const now = Date.now();
      if (now - lastMoveTimeRef.current < 180) return;
      lastMoveTimeRef.current = now;

      if (e?.type === 'touchstart') {
        e.preventDefault();
      }

      const btn = buttonRef.current;
      if (!btn) return;

      const btnRect = btn.getBoundingClientRect();
      const btnW = btnRect.width;
      const btnH = btnRect.height;

      // Recover the button's untransformed layout origin on screen
      const originLeft = btnRect.left - offsetRef.current.x;
      const originTop = btnRect.top - offsetRef.current.y;

      // Always keep within visible viewport bounds, intersected with container if provided
      const pad = 16;
      let minLeft = pad;
      let maxLeft = window.innerWidth - btnW - pad;
      let minTop = pad + 20; // clear top progress bar
      let maxTop = window.innerHeight - btnH - pad;

      if (containerRef?.current) {
        const cr = containerRef.current.getBoundingClientRect();
        minLeft = Math.max(minLeft, cr.left + pad);
        maxLeft = Math.min(maxLeft, cr.right - btnW - pad);
        minTop = Math.max(minTop, cr.top + pad);
        maxTop = Math.min(maxTop, cr.bottom - btnH - pad);
      }

      // Ensure valid ranges even on very small screens
      if (maxLeft < minLeft) {
        minLeft = pad;
        maxLeft = Math.max(pad, window.innerWidth - btnW - pad);
      }
      if (maxTop < minTop) {
        minTop = pad + 20;
        maxTop = Math.max(minTop, window.innerHeight - btnH - pad);
      }

      const avoidRect = avoidRef?.current?.getBoundingClientRect() ?? null;
      const avoidMargin = 16;

      let chosenLeft = originLeft;
      let chosenTop = originTop;

      for (let tries = 0; tries < 40; tries++) {
        const candLeft = minLeft + Math.random() * Math.max(1, maxLeft - minLeft);
        const candTop = minTop + Math.random() * Math.max(1, maxTop - minTop);

        // Must jump noticeably away from current position
        const distFromCurrent = Math.hypot(candLeft - btnRect.left, candTop - btnRect.top);
        if (distFromCurrent < 65 && tries < 30) continue;

        // Must not overlap the stationary YES / Forgive button
        if (avoidRect) {
          const overlapsAvoid = !(
            candLeft + btnW + avoidMargin < avoidRect.left ||
            candLeft - avoidMargin > avoidRect.right ||
            candTop + btnH + avoidMargin < avoidRect.top ||
            candTop - avoidMargin > avoidRect.bottom
          );
          if (overlapsAvoid) continue;
        }

        chosenLeft = candLeft;
        chosenTop = candTop;
        break;
      }

      const nextOffset = {
        x: chosenLeft - originLeft,
        y: chosenTop - originTop,
      };
      offsetRef.current = nextOffset;
      setOffset(nextOffset);

      const nextCount = moveCount + 1;
      setMoveCount(nextCount);
      onMove?.(nextCount);

      if (nextCount >= maxMoves) {
        if (returnAfterSingleMove || maxMoves === 1) {
          // Playful single dodge, then return smoothly to a stable clickable position
          settleTimerRef.current = setTimeout(() => {
            offsetRef.current = { x: 0, y: 0 };
            setOffset({ x: 0, y: 0 });
            setIsSettled(true);
          }, 700);
        } else {
          // Stop moving at final safe spot after a brief settle
          settleTimerRef.current = setTimeout(() => {
            setIsSettled(true);
          }, 350);
        }
      }
    },
    [isSettled, moveCount, maxMoves, containerRef, avoidRef, onMove, returnAfterSingleMove]
  );

  const handleClick = () => {
    if (isSettled && clickHandler) {
      clickHandler();
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      onMouseEnter={!isSettled ? handleEvade : undefined}
      onTouchStart={!isSettled ? handleEvade : undefined}
      onClick={handleClick}
      animate={{ x: offset.x, y: offset.y }}
      transition={
        !isSettled
          ? { type: 'spring', stiffness: 320, damping: 20 }
          : { type: 'spring', stiffness: 220, damping: 24 }
      }
      whileHover={isSettled ? { scale: 1.05 } : {}}
      whileTap={isSettled ? { scale: 0.95 } : {}}
      style={{
        padding: '14px 36px',
        fontSize: 'clamp(0.95rem, 2.8vw, 1.15rem)',
        fontWeight: 600,
        fontFamily: "'Quicksand', sans-serif",
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: 50,
        cursor: isSettled ? 'pointer' : 'default',
        background: 'linear-gradient(135deg, #C8A2E8, #9B72CF)',
        color: '#FFF8FC',
        boxShadow: '0 4px 18px rgba(200, 162, 232, 0.4)',
        position: 'relative',
        zIndex: 10,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: isSettled ? 'manipulation' : 'none',
        ...style,
      }}
    >
      {displayLabel}
    </motion.button>
  );
};

export default MovingButton;
