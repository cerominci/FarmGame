"use client";
import { useState, useEffect, useContext } from "react";
import styles from "./Box.module.css";
import { BalanceContext } from "@/app/contexts/BalanceContext";
import { FlowerStoreContext } from "@/app/contexts/FlowerStoreContext";

export default function Box() {
    const [stage, setStage] = useState(0); 
    const [isGrowing, setIsGrowing] = useState(false);
    const [isWaitingForCollection, setIsWaitingForCollection] = useState(false);
    const [balance, setBalance] = useContext(BalanceContext);
    const [selectedFlower] = useContext(FlowerStoreContext);
    
    const getStageContent = (stageNum: number) => {
        switch(stageNum) {
            case 0: return ""; 
            case 1: return "🌱"; 
            case 2: return "🌿"; 
            case 3: return "🌾"; 
            case 4: return selectedFlower.emoji; 
            case 5: return "🥀"; 
            default: return "";
        }
    };

    const handleClick = () => {
        if (stage === 0 && balance >= selectedFlower.seedPrice) {
            setStage(1); 
            setIsGrowing(true);
            setBalance(balance - selectedFlower.seedPrice);
        } 
        else if (stage === 4 && isWaitingForCollection) {
            setStage(0);
            setIsGrowing(false);
            setIsWaitingForCollection(false);
            setBalance(balance + selectedFlower.cropPrice);
        }
        else if (stage === 5) {
            setStage(0); 
            setIsGrowing(false);
            setIsWaitingForCollection(false);
        }
        else if(stage > 0 && stage < 4) {
            setStage(0); 
            setIsGrowing(false);
            setIsWaitingForCollection(false);
        }
    };

    useEffect(() => {
        let growthInterval: NodeJS.Timeout | null = null;
        if (isGrowing) {
            growthInterval = setInterval(() => {
                setStage(prevStage => {
                    if (prevStage === 4) {
                        setIsGrowing(false);
                        setIsWaitingForCollection(true);
                        return prevStage;
                    }
                    return prevStage + 1;
                });
            }, 1000); 
        }

        return () => {
            if (growthInterval) {
                clearInterval(growthInterval);
            }
        };
    }, [isGrowing]);

    useEffect(() => {
        let rotTimer: NodeJS.Timeout | null = null;
        if (isWaitingForCollection) {
            rotTimer = setTimeout(() => {
                setStage(5);
                setIsWaitingForCollection(false);
            }, 1500);
        }

        return () => {
            if (rotTimer) {
                clearTimeout(rotTimer);
            }
        };
    }, [isWaitingForCollection]);

    const stageClass = styles[`stage${stage}`] || '';

    return (
        <div 
            className={`${styles.box} ${stageClass}`}
            onClick={handleClick}
        >
            <div className={styles.boxContent}>
                {getStageContent(stage)}
            </div>
        </div>
    );
}