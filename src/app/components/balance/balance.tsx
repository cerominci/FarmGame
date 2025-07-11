import { useContext } from "react";
import { BalanceContext } from "@/app/contexts/BalanceContext";
import styles from "./Balance.module.css";

export const BalanceDisplay = () => {
    const [balance] = useContext(BalanceContext);

    return (
        <div className={styles.balance}>
            <h2>Balance: {balance}$</h2>
        </div>
    );
};