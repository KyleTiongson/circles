import React, { useState, useEffect } from 'react';

const CircleApp = () => {
  const [circle, setCircle] = useState({
    x: Math.floor(Math.random() * 90),
    y: Math.floor(Math.random() * 90),
    radius: 200,
    color: getRandomColor(),
  });

  const [score, setScore] = useState({
    hits: 0,
    misses: 0,
  });

  const [gameFinished, setGameFinished] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // State to control when the game starts

  useEffect(() => {
    // Ensure body has no margin, padding, and no scrollbars
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.style.overflow = 'hidden';
  }, []);

  useEffect(() => {
    let timer;
    if (timerRunning) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerRunning]);

  const handleCircleClick = (e) => {
    if (gameFinished || !gameStarted) return;

    e.stopPropagation();
    const newHits = score.hits + 1;

    if (newHits >= 30) {
      setGameFinished(true);
      setTimerRunning(false);
    } else {
      respawnCircle(newHits);
    }

    setScore({ ...score, hits: newHits });
  };

  const handleMissClick = () => {
    if (gameFinished || !gameStarted) return;

    setScore({ ...score, misses: score.misses + 1 });
    respawnCircle(score.hits);
  };

  const handleStart = () => {
    setGameStarted(true);
    setTimerRunning(true);
  };

  const handleRestart = () => {
    setScore({ hits: 0, misses: 0 });
    setGameFinished(false);
    setTimeElapsed(0);
    setTimerRunning(false);
    setGameStarted(false);
    respawnCircle(0);
  };

  const respawnCircle = (hits) => {
    setCircle({
      x: Math.floor(Math.random() * 90),
      y: Math.floor(Math.random() * 90),
      radius: getRadius(hits),
      color: getRandomColor(),
    });
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div style={styles.container} onClick={handleMissClick}>
      {!gameStarted ? (
        <button style={styles.startButton} onClick={handleStart}>
          Start
        </button>
      ) : gameFinished ? (
        <div style={styles.finishMessage}>
          You finished the test!
          <br />
          Time taken: {formatTime(timeElapsed)}
          <br />
          <button style={styles.restartButton} onClick={handleRestart}>
            Restart
          </button>
        </div>
      ) : (
        <div
          style={{
            ...styles.circle,
            left: `${circle.x}%`,
            top: `${circle.y}%`,
            width: `${circle.radius}px`,
            height: `${circle.radius}px`,
            backgroundColor: circle.color,
          }}
          onClick={handleCircleClick}
        />
      )}
      <div style={styles.scoreContainer}>
        <span style={styles.scoreText}>Hits: {score.hits}</span>
        <span style={styles.scoreText}>Misses: {score.misses}</span>
        <span style={styles.timerText}>Time: {formatTime(timeElapsed)}</span>
      </div>
    </div>
  );
};

const getRadius = (hits) => {
  const initialRadius = 200;
  const minRadius = 20;
  const decayFactor = 0.9;

  const radius = initialRadius * Math.pow(decayFactor, hits);

  return Math.max(minRadius, radius);
};

const getRandomColor = () => {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const styles = {
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50vw',
    height: '100vh',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  scoreContainer: {
    position: 'absolute',
    top: '40px',
    left: '20px',
  },
  scoreText: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginRight: '10px',
    color: 'black',
  },
  timerText: {
    fontSize: '24px',
    color: 'black',
    fontWeight: 'bold',
    marginLeft: '20px',
  },
  startButton: {
    padding: '15px 30px',
    fontSize: '24px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  finishMessage: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
  restartButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default CircleApp;
