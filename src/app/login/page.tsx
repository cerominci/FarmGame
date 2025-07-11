"use client"
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';

export default function Home() {
  const router = useRouter();

  function handleSignIn() {
    router.push('/signin');
  }
  
  function handleSignUp() {
    router.push('/signup');
  }
  
    
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Farm Game</h1>
      <p>Welcome to the Farm Game! Please sign in or sign up to continue.</p>
      <button className={styles.button} onClick={handleSignIn}>Sign In</button>
      <button className={styles.button} onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}