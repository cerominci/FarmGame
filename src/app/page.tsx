"use client";
import styles from "./page.module.css";
import Box from "./components/box/box";
import { useState, useEffect } from "react";
import { BalanceContext } from "./contexts/BalanceContext";
import { BalanceDisplay } from "./components/balance/balance";

export default function Home() {
  const [balance, setBalance] = useState(100);

  const renderFarmGrid = () => {
    const boxes = [];
    for (let i = 0; i < 16; i++) {
      boxes.push(
        <Box
          key={i}
        />
      );
    }
    return boxes;
  };

  return (
    <BalanceContext.Provider value={[balance, setBalance]}>
      <div className={styles.container}>
        <div className={styles.balanceTopLeft}>
          <BalanceDisplay />
        </div>
        <div className={styles.farmGrid}>{renderFarmGrid()}</div>
      </div>
    </BalanceContext.Provider>
  );
}


