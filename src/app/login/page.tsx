"use client"
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  function handleSignIn() {
    router.push('/signin');
  }
  
  function handleSignUp() {
    router.push('/signup');
  }
  
    
  return (
    <div >
        <h1 >Farm Game</h1>
        <p>Welcome to the Farm Game! Please sign in or sign up to continue.</p>
      <button  onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}