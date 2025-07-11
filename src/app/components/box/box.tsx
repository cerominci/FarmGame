"use client";
import { useState, useEffect, useContext } from "react";
import styles from "./Box.module.css";
import { BalanceContext } from "@/app/contexts/BalanceContext";

export default function Box(){
    const [stage, setStage] = useState(0); 
    const [isGrowing, setIsGrowing] = useState(false);
    const [isWaitingForCollection, setIsWaitingForCollection] = useState(false);
    const [balance, setBalance] = useContext(BalanceContext);

    const stages = ["", "Tohum", "Fidan", "Bitki", "Çiçek", "Kurumuş Çiçek"];

    const seedCost = 1; 
    const cropReward = 3;
    const handleClick = () => {
        if (stage === 0 && balance >= seedCost) {
            setStage(1); 
            setIsGrowing(true);
            setBalance(balance - seedCost); 
        } 
        else if (stage === 4 && isWaitingForCollection) {
            setStage(0);
            setIsGrowing(false);
            setIsWaitingForCollection(false);
            setBalance(balance + cropReward);
        }
        else if (stage === 5) {
            setStage(0); 
            setIsGrowing(false);
            setIsWaitingForCollection(false);
        }
    };


    useEffect(() => {
        let growthInterval = null;
        if (isGrowing) {
            growthInterval = setInterval(() => {
                setStage(prevStage => {
                    if (prevStage === 4) {
                        setIsGrowing(false);
                        return prevStage;
                    }
                    return prevStage + 1;
                });
            }, 2000);
        }
        return () => {
            if (growthInterval) {
                clearInterval(growthInterval);
            }
        };
    }, [isGrowing]);

    useEffect(() => {
        if (stage === 4) {
            setIsWaitingForCollection(true);
        } 
        else {
            setIsWaitingForCollection(false);
        }
    }, [stage]);

    useEffect(() => {
        let rotTimer = null;
        
        if (isWaitingForCollection) {
            rotTimer = setTimeout(() => {
                setStage(5); 
                setIsWaitingForCollection(false);
            }, 4000); 
        }

        return () => {
            if (rotTimer) {
                clearTimeout(rotTimer);
            }
        };
    }, [isWaitingForCollection]);

    return(
        <div className={styles.box} onClick={handleClick}>
            <div className={styles.boxContent}>
                <h2>{stages[stage]}</h2>
            </div>
        </div>
    );
};