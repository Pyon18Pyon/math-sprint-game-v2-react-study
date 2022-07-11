import React, { useRef, useEffect } from "react";
import styles from "./ScorePage.module.css";

function ScorePage({
  isFinished,
  timePlayed,
  penaltyTime,
  finalTime,
  playAgain,
}) {
  // Ref
  const buttonEl = useRef(null);

  const baseTime = timePlayed.toFixed(1);
  const penalty = penaltyTime.toFixed(1);
  const finalTimeDisplay = finalTime.toFixed(1);
  console.log("baseTime:", baseTime);

  useEffect(() => {
    setTimeout(() => {
      buttonEl.current.hidden = false;
    }, 1000);
  }, [isFinished]);

  return (
    <div className={styles.card} id="score-page" hidden={!isFinished}>
      {/* Score Container */}
      <div className={styles.scoreContainer}>
        <h1 className={styles.title}>Your Time</h1>
        <h1 className={styles.finalTime}>{`${finalTimeDisplay}s`}</h1>
        <h1 className={styles.baseTime}>{`Base Time: ${baseTime}s`}</h1>
        <h1 className={styles.penaltyTime}>{`Penalty: +${penalty}s`}</h1>
      </div>
      {/* Play Again Button */}
      <div className={styles.scoreFooter}>
        <button
          className={styles.playAgain}
          ref={buttonEl}
          hidden={isFinished}
          onClick={playAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

export default ScorePage;
