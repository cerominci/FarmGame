"use client";
import styles from "./page.module.css";
import Box from "./components/box/box";

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

  return (
    <div className={styles.container}>
      <h1>Farm Game</h1>

      <div className={styles.farmGrid}>
        {renderFarmGrid()}
      </div>
    </div>
  );
}


