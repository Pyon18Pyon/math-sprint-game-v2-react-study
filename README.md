# math-sprint-game-v2-react-study

This project was created in React after the completion of the Udemy course, [JavaScript Web Project: 20 Projects to Build Your Portfolio](https://www.udemy.com/course/javascript-web-projects-to-build-your-portfolio-resume/).

During this course, the project was made with vanilla JavaScript so I rewrote the entire app in React.
The vanilla JavaScript version: [math-sprint-game-v1-javascript-study](https://github.com/Pyon18Pyon/math-sprint-game-v1-javascript-study).

## How to play?

This is a math based game. Select the number of questions, then click the **Start Round** button. After the countdown, simple math equations will appear on the screen. The current equation gets highlighted in blue so all we need to do is to evaluate whether the equation is correct or incorrect, and quickly click the **Wrong** or **Right** button. The timer starts when we click on the first button and it stops at the last equation. We will receive our score of how long it took at the end of each game. There will be 0.5 seconds penalty for every incorrect guess. 

## Key features

- Usage of timing events.
- Generating random correct and incorrect equations.
- Store a best score in localStorage for each corresponding amount of questions.
- Scrolls down automatically to the next equation in the game page.
- The base score, the penalty (if any) and the final score will appear on the score page.
- The best score on the splash page gets updated.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
