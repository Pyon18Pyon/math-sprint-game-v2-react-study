import React, { useEffect, useRef } from 'react';
import styles from './GamePage.module.css';



function GamePage({ isPlaying, equationArray, onClicked, valueY, isFinished }) {

  // Ref
  const itemRef = useRef(null);

  useEffect(() => {
    itemRef.current.scroll(0, valueY);
  }, [valueY]);

  useEffect(() => {
    itemRef.current.scrollTo({ top: 0, behavior: 'instant'});
  }, [isPlaying]);
  

  return (
    <div className={styles.card} id="game-page" hidden={isFinished ? true : !isPlaying}>
      {/* Item Container */}
      <div className={styles.itemContainer} ref={itemRef}>
        {/* Spacer */}
        <div className={styles.height240}></div>
        {/* Selected Item */}
        <div className={styles.selectedItem}></div>
        {equationArray.map((item) => {
          return <div className={styles.item} key={item.value}>
            <h1>{item.value}</h1>
          </div>
        })}
        {/* Set Blank Space Below */}
        <div className={styles.height500}></div>
      </div>

      {/* Right/Wrong Buttons */}
      <div className={styles.itemFooter}>
        <button className={styles.wrong} onClick={() => onClicked(false)}>Wrong</button>
        <button className={styles.right} onClick={() => onClicked(true)}>Right</button>
      </div>
    </div>
  );
}

export default GamePage;