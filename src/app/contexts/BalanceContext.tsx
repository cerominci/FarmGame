import { createContext } from "react";

export const BalanceContext = createContext<[number, React.Dispatch<React.SetStateAction<number>>]>([0, () => {}]);

