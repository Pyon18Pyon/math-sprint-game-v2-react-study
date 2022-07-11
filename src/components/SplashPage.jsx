import React from 'react';
import styles from './SplashPage.module.css';
import cx from 'classnames';

const questionsRadioInput = [10, 25, 50, 99]; 

function SplashPage({ selectQuestionAmount, questionCount, startRound, isStarted }) {

  const selectedContainer = cx(styles.radioContainer, {[styles.selectedLabel]: true});

  return (
    <div className={styles.card} id="splash-page" hidden={isStarted}>
      <form id="start-form" onClick={selectQuestionAmount}>
      {questionsRadioInput.map((number) => {
        return <div className={styles.selectionContainer} key={number}>
          {/* Questions Radio Input */}
             <div className={questionCount === number ? selectedContainer : styles.radioContainer}>
             <label className={styles.question} htmlFor={`value-${number}`}>{`${number} Questions`}</label>
             <input type="radio" name="questions" value={number} id={`value-${number}`} />
             <span className={styles.bestScore}>
               <span>Best Score</span>
               <span className={styles.bestScoreValue}></span>
             </span>
           </div>
        </div>
        })}
        {/* Start Button */}
        <div className={styles.selectionFooter}>
          <button className={styles.start} type="submit" onClick={startRound}>Start Round</button>
        </div>
      </form>
    </div>
  );
}

export default SplashPage;