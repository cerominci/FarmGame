"use client"
import styles from "./Plant.module.css";
import { useState } from "react";


export default function Plant() {
  const [isPlanted, setIsPlanted] = useState(false);

  const handlePlant = () => {
    setIsPlanted(true);
  };

  return (
    <div className={styles.plant}>
      <h2>Plant Component</h2>
      <button onClick={handlePlant}>Plant Seed</button>
    </div>
  );
}

