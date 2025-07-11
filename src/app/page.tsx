"use client";
import styles from "./page.module.css";
import Box from "./components/box/box";
import { useState, useEffect } from "react";
import { BalanceContext } from "./contexts/BalanceContext";
import { BalanceDisplay } from "./components/balance/balance";
import { Store } from "./components/store/Store";
import { FlowerStoreContext, defaultFlower, Flower } from "./contexts/FlowerStoreContext";

export default function Home() {
  const [balance, setBalance] = useState(100);
  const [selectedFlower, setSelectedFlower] = useState<Flower>(defaultFlower);
  const [isStoreOpen, setIsStoreOpen] = useState(false);

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
    <FlowerStoreContext.Provider value={[selectedFlower, setSelectedFlower]}>
      <BalanceContext.Provider value={[balance, setBalance]}>
        <div className={styles.container}>
          <div className={styles.balanceTopLeft}>
            <BalanceDisplay />
          </div>
          <button 
            className={`${styles.storeButton} ${styles.storeTopRight}`}
            onClick={() => setIsStoreOpen(true)}
          >
            Open Store 🏪
          </button>
          <div className={styles.farmGrid}>{renderFarmGrid()}</div>
          <Store isOpen={isStoreOpen} onClose={() => setIsStoreOpen(false)} />
        </div>
      </BalanceContext.Provider>
    </FlowerStoreContext.Provider>
  );
}


