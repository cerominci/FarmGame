"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from "./Signin.module.css";

interface User {
  username: string;
  password: string;
}

export default function SignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSignIn() {
    setError('');

    if (!username || !password) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      
      const user = users.find((u: User) => u.username === username && u.password === password);
      
      if (!user) {
        setError('Kullanıcı adı veya şifre yanlış.');
        return;
      }

      localStorage.setItem('currentUser', username);
      
      alert('Giriş başarılı!');
      router.push('/'); 
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu.');
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Giriş Yap</h1>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Kullanıcı adı"
        className={styles.input}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Şifre"
        className={styles.input}
      />
      <button 
        onClick={handleSignIn}
        className={styles.button}
      >
        Giriş Yap
      </button>
      <p className={styles.signupLink}>
        Hesabın yok mu?{' '}
        <span onClick={() => router.push('/signup')}>
          Kayıt ol
        </span>
      </p>
    </div>
  );

}
