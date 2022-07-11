import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import SplashPage from './components/SplashPage';
import CountdownPage from './components/CountdownPage';
import GamePage from './components/GamePage';
import ScorePage from './components/ScorePage';
import { createEquations } from './createEquations';
import styles from './App.module.css';


// Variables
let timestampStart = 0;
let timestampFinish = 0;
// let playerGuessArray = []; --> This variable must be put outside the react function!


function App() {
  // State
  const [questionCount, setQuestionCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const [countdownTimer, setCountdownTimer] = useState({
    count: 3,
    isPlaying: false,
    isFinished: false
  });

  const [equationArray, setEquationArray] = useState([]);

  const [valueY, setValueY] = useState(0);
  const [playerGuessArray, setPlayerGuessArray] = useState([]);

  const [time, setTime] = useState({
    timePlayed: 0,
    penaltyTime: 0,
    finalTime: 0
  });

  const [bestScoreArray, setBestScoreArray] = useState([
      { questions: 10, bestScore: 0 },
      { questions: 25, bestScore: 0 },
      { questions: 50, bestScore: 0 },
      { questions: 99, bestScore: 0 }
  ]);;

  // Destructuring
  const { count, isPlaying, isFinished } = countdownTimer;
  const { timePlayed, penaltyTime, finalTime } = time;
  // const { questions, bestScore } = bestScoreArray;


  const selectQuestionAmount = (event) => {
    event.preventDefault();
    setQuestionCount(+event.target.value);
  };

  const startRound = () => {
    setIsStarted(true);
    const intervalId = setInterval(() => {
      setCountdownTimer(ct => {
        if (ct.count === 0) {
          clearInterval(intervalId);
          return { ...ct, isPlaying: true };
        } else {
          return { ...ct, count: ct.count - 1 };
        }
      });
    }, 1000);

    setEquationArray(createEquations(questionCount));
  };

  useEffect(() => {
    if (isPlaying) {
      const currentDateStart = new Date();
      timestampStart = Math.round(currentDateStart.getTime() / 1000);
      console.log('timestampStart:', timestampStart);
    }
  }, [isPlaying]);

  const handleClick = (guessedTrue) => {
    // Scroll 80px
    setValueY((value) => value += 80);

    // Add player guess to array
    // console.log('playerGuessArray:', JSON.stringify(playerGuessArray));
    // guessedTrue ? playerGuessArray.push(true) : playerGuessArray.push(false);
    // console.log('playerGuessArray2:', JSON.stringify(playerGuessArray));
    setPlayerGuessArray((prev) => [...prev, guessedTrue ? true : false]);

    if (playerGuessArray.length === equationArray.length - 1) {
      setCountdownTimer({ ...countdownTimer, isFinished: true });
      const currentDateFinish = new Date();
      timestampFinish = Math.round(currentDateFinish.getTime() / 1000);
      console.log('timestampFinish:', timestampFinish);
      setTime({ ...time, timePlayed: timestampFinish - timestampStart })
    }
  };

  useEffect(() => {
    const wrongAnswers = equationArray.filter((equation, index) => equation.evaluated !== playerGuessArray[index]);
    setTime({ ...time, penaltyTime: wrongAnswers.length * 0.5 });
  }, [isFinished]);

  useEffect(() => {
    setTime({ ...time, finalTime: timePlayed + penaltyTime });
  }, [penaltyTime]);

  useEffect(() => {
    if (localStorage.getItem('bestScores')) {
      setBestScoreArray(JSON.parse(localStorage.bestScores));
    } else { 
      localStorage.setItem('bestScores', JSON.stringify(bestScoreArray));
    }
  }, []);
 
  useEffect(() => {
    if (bestScoreArray) {
      setBestScoreArray((prev) =>
        prev.map((score) => {
          if (equationArray.length === score.questions
             && (score.bestScore === 0 || score.bestScore > finalTime))
          {
            return {...score, bestScore: finalTime};
          }

          return score;
        })
      );
    }
  }, [finalTime]);

  useEffect(() => {
    localStorage.setItem('bestScores', JSON.stringify(bestScoreArray)); 
  }, [bestScoreArray]);

  console.log('bestScoreArray:', bestScoreArray);

  const playAgain = () => {
    setQuestionCount(0);
    setIsStarted(false);
    setCountdownTimer({ 
      count: 3,
      isPlaying: false, 
      isFinished: false });
    setEquationArray([]);
    setValueY(0);
    setPlayerGuessArray([]);
    setTime({
      timePlayed: 0,
      penaltyTime: 0,
      finalTime: 0
    });
  };


  return (
    <div className={styles.gameContainer}>
      <Header />
      <SplashPage
        selectQuestionAmount={selectQuestionAmount}
        questionCount={questionCount}
        startRound={startRound}
        isStarted={isStarted}
      />
      <CountdownPage
        isStarted={isStarted}
        text={count <= 0 ? 'GO!' : count}
        isPlaying={isPlaying}
      />
      <GamePage
        isPlaying={isPlaying}
        equationArray={equationArray}
        onClicked={handleClick}
        valueY={valueY}
        isFinished={isFinished}
      />
      <ScorePage
        isFinished={isFinished}
        timePlayed={timePlayed}
        penaltyTime={penaltyTime}
        finalTime={finalTime}
        playAgain={playAgain}
      />
    </div>
  );
}

export default App;
