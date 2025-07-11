"use client";
import { useContext, useState } from 'react';
import styles from './Store.module.css';
import { Flower, FlowerStoreContext } from '../../contexts/FlowerStoreContext';

const flowers: Flower[] = [
  { name: "Sunflower", seedPrice: 10, cropPrice: 20, emoji: "🌻" },
  { name: "Tulip", seedPrice: 20, cropPrice: 40, emoji: "🌷" }
];

interface StoreProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Store: React.FC<StoreProps> = ({ isOpen, onClose }) => {
  const [selectedFlower, setSelectedFlower] = useContext(FlowerStoreContext);

  if (!isOpen) return null;

  return (
    <div className={styles.storeModal} onClick={onClose}>
      <div className={styles.storeModalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Flower Store</h2>
        <div className={styles.flowerList}>
          {flowers.map((flower) => (
            <button
              key={flower.name}
              className={`${styles.flowerButton} ${selectedFlower.name === flower.name ? styles.selected : ''}`}
              onClick={() => setSelectedFlower(flower)}
            >
              <div>
                <div>{flower.emoji}</div>
                <div>{flower.name}</div>
                <div>Seed: ${flower.seedPrice}</div>
                <div>Crop: ${flower.cropPrice}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};