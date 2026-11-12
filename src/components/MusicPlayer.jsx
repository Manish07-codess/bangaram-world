import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX } from 'lucide-react';

const TOOLTIP_TEXT = 'A little song for you, Bangaram ❤️';
const DEFAULT_VOLUME = 0.3;

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = DEFAULT_VOLUME;

    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
    } else {
      audio.volume = DEFAULT_VOLUME;
      audio.muted = isMuted;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [isMuted]);

  const toggleMute = useCallback((e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
  }, [isMuted]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 14,
        right: 14,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Persistent single audio element across all scenes */}
      <audio ref={audioRef} loop preload="metadata">
        <source src="./audio/our-music.mp3" type="audio/mpeg" />
        <source src="./audio/our-song.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating glass pill with Music Play/Pause & Mute/Unmute */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '5px',
          borderRadius: 999,
          background: 'rgba(36, 21, 54, 0.58)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: isPlaying
            ? '1px solid rgba(255, 92, 154, 0.55)'
            : '1px solid rgba(255, 182, 213, 0.28)',
          boxShadow: isPlaying
            ? '0 0 22px rgba(255, 92, 154, 0.35), 0 6px 20px rgba(0, 0, 0, 0.3)'
            : '0 4px 16px rgba(0, 0, 0, 0.25)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Main Play/Pause Music-Note Button */}
        <motion.button
          type="button"
          onClick={togglePlay}
          title={TOOLTIP_TEXT}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          style={{
            position: 'relative',
            width: 38,
            height: 38,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            background: isPlaying
              ? 'linear-gradient(135deg, #FF5C9A, #C8A2E8)'
              : 'rgba(255, 182, 213, 0.2)',
            color: '#FFF8FC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            boxShadow: isPlaying ? '0 0 14px rgba(255, 92, 154, 0.55)' : 'none',
          }}
        >
          <motion.span
            animate={
              isPlaying
                ? { y: [0, -2.5, 0], rotate: [-6, 6, -6], scale: [1, 1.08, 1] }
                : { scale: [1, 1.04, 1] }
            }
            transition={{
              repeat: Infinity,
              duration: isPlaying ? 1.4 : 2.8,
              ease: 'easeInOut',
            }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Music size={18} strokeWidth={2.2} />
          </motion.span>
        </motion.button>

        {/* Mute / Unmute Button */}
        <motion.button
          type="button"
          onClick={toggleMute}
          title={isMuted ? 'Unmute song' : 'Mute song'}
          aria-label={isMuted ? 'Unmute song' : 'Mute song'}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            background: isMuted
              ? 'rgba(255, 92, 154, 0.22)'
              : 'rgba(255, 255, 255, 0.08)',
            color: isMuted ? '#FFB6D5' : '#FFF8FC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
          }}
        >
          {isMuted ? (
            <VolumeX size={16} strokeWidth={2.2} />
          ) : (
            <Volume2 size={16} strokeWidth={2.2} />
          )}
        </motion.button>
      </div>

      {/* Cute floating tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: -6, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'rgba(36, 21, 54, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 182, 213, 0.35)',
              borderRadius: 14,
              padding: '6px 12px',
              color: '#FFF8FC',
              fontFamily: "'Quicksand', sans-serif",
              fontSize: '0.78rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              maxWidth: 'calc(100vw - 28px)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35), 0 0 14px rgba(255, 92, 154, 0.25)',
              pointerEvents: 'none',
            }}
          >
            {TOOLTIP_TEXT}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicPlayer;
