import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace) => {
    setMode(mode);
    if (replace) {
      setHistory(history => {
        history[history.length - 1] = mode;
        return history;
      })
    } else {
      setHistory(history => {
        history.push(mode);
        return history;
      })
    }
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(history => {
        history.pop();
        return history;
      });
    }
  };

  return {
    mode,
    transition,
    back,
  };
};