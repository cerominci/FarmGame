import { createContext } from "react";

export interface Flower {
  name: string;
  seedPrice: number;
  cropPrice: number;
  emoji: string;
}

export const defaultFlower: Flower = { name: "Sunflower", seedPrice: 10, cropPrice: 20, emoji: "🌻" };

export const FlowerStoreContext = createContext<[Flower, (f: Flower) => void]>([defaultFlower, () => {}]);