"use client";
import styles from "./page.module.css";
import Box from "./components/box/box";
import { useState } from "react";

export default function Home() {
  const renderFarmGrid = () => {
    const boxes = [];
    for (let i = 0; i < 16; i++) {
      boxes.push(
        <Box key={i} />
      );
    }
    return boxes;
  };

  const [states, setStates] = useState(Array(16).fill(false));

  function plantSeed(index) {
    const newStates = [...states];
    newStates[index] = true;
    setStates(newStates);
  }

  return (
    <div className={styles.container}>
      <h1>Farm Game</h1>

      <div className={styles.farmGrid}>
        {renderFarmGrid()}
      </div>
    </div>
  );
}


