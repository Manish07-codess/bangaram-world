import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';

import WelcomeScene from './scenes/WelcomeScene';
import ApologyScene from './scenes/ApologyScene';
import SpecialScene from './scenes/SpecialScene';
import LetterScene from './scenes/LetterScene';
import PromiseScene from './scenes/PromiseScene';
import FlirtyScene from './scenes/FlirtyScene';
import AskOutScene from './scenes/AskOutScene';
import FinalScene from './scenes/FinalScene';

import MusicPlayer from './components/MusicPlayer';
import FloatingHearts from './components/FloatingHearts';

const TOTAL_SCENES = 8;

const scenes = [
  WelcomeScene,
  ApologyScene,
  SpecialScene,
  LetterScene,
  PromiseScene,
  FlirtyScene,
  AskOutScene,
  FinalScene,
];

function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const [direction, setDirection] = useState(1);
  const [sceneResults, setSceneResults] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScene]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentScene((prev) => Math.min(prev + 1, TOTAL_SCENES - 1));
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentScene((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleRestart = useCallback(() => {
    setDirection(-1);
    setSceneResults({});
    setCurrentScene(0);
  }, []);

  const handleResult = useCallback((keyOrObj, value) => {
    if (keyOrObj && typeof keyOrObj === 'object') {
      setSceneResults((prev) => ({ ...prev, ...keyOrObj }));
    } else if (typeof keyOrObj === 'string') {
      setSceneResults((prev) => ({ ...prev, [keyOrObj]: value }));
    }
  }, []);

  const progressWidth = ((currentScene + 1) / TOTAL_SCENES) * 100;
  const CurrentSceneComponent = scenes[currentScene];

  return (
    <MotionConfig reducedMotion="user">
      {/* Progress Bar */}
      <div className="progress-bar-container" aria-label="Journey progress">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressWidth}%` }}
        />
      </div>

      {/* Subtle Back & Step Indicator (shown after Welcome scene) */}
      {currentScene > 0 && (
        <div
          style={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <motion.button
            type="button"
            onClick={handlePrev}
            aria-label="Go to previous scene"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'rgba(36, 21, 54, 0.55)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 182, 213, 0.25)',
              borderRadius: 999,
              padding: '7px 14px',
              color: '#FFF8FC',
              fontFamily: "'Quicksand', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
            }}
          >
            ← Back
          </motion.button>
          <span
            style={{
              background: 'rgba(36, 21, 54, 0.45)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 999,
              padding: '6px 12px',
              color: '#FFB6D5',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.03em',
            }}
          >
            {currentScene + 1} / {TOTAL_SCENES}
          </span>
        </div>
      )}

      {/* Floating Hearts Background */}
      <FloatingHearts />

      {/* Music Player */}
      <MusicPlayer />

      {/* Scene Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, y: direction > 0 ? 40 : -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: direction > 0 ? -40 : 40 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
        >
          <CurrentSceneComponent
            onNext={handleNext}
            onPrev={currentScene > 0 ? handlePrev : undefined}
            onRestart={handleRestart}
            onResult={handleResult}
            sceneResults={sceneResults}
          />
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}

export default App;
