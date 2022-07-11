import React from 'react';
import styles from './CountdownPage.module.css';


function CountdownPage({ isStarted, text, isPlaying }) {

  return (
    <div className="card" id="countdown-page" hidden={text === 'GO!' ? isPlaying : !isStarted}>
      <h1 className={styles.countdown}>{text}</h1>
    </div>
  );
}

export default CountdownPage;