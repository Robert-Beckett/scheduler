import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    setMode(mode);
    if (replace) {
      setHistory(prev => {
        prev[prev.length - 1] = mode;
        return prev;
      })
    } else {
      setHistory(prev => {
        prev.push(mode);
        return prev;
      })
    }
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => {
        prev.pop();
        return prev;
      });
    }
  };

  return {
    mode,
    transition,
    back,
  };
};