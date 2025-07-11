"use client";
import styles from "./page.module.css";
import Box from "./components/box/box";
import { useState, useEffect } from "react";
import { BalanceContext } from "./contexts/BalanceContext";
import { BalanceDisplay } from "./components/balance/balance";
import { useRouter } from "next/navigation";

export default function Home() {
  const [balance, setBalance] = useState(3);
  const [boxStages, setBoxStages] = useState(Array(16).fill(0));
  const router = useRouter();
  const seedCost = 1;

  useEffect(() => {
    const plantedStages = boxStages.filter((stage) => stage !== 0);
    const allPlantedAreRotten =
      plantedStages.length > 0 &&
      plantedStages.every((stage) => stage === 5);
    if (balance < seedCost && allPlantedAreRotten) {
      alert("Game over!");
      router.push("/login");
    }
  }, [balance, boxStages, router]);

  const renderFarmGrid = () => {
    const boxes = [];
    for (let i = 0; i < 16; i++) {
      boxes.push(
        <Box
          key={i}
          index={i}
          stage={boxStages[i]}
          setStage={(stage) => {
            const newStages = [...boxStages];
            newStages[i] = stage;
            setBoxStages(newStages);
          }}
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


