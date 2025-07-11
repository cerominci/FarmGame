"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './Signup.module.css'; 

interface User {
  username: string;
  password: string;
}

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  function handleSaveCredentials() {
    setError('');

    if (!username || !password || !confirmPassword) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return;
    }

    try {
      const existingUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      
      const userExists = existingUsers.some((user: User) => user.username === username);
      if (userExists) {
        setError('Bu kullanıcı adı zaten kullanılıyor.');
        return;
      }

      const newUser: User = {
        username,
        password
      };
      existingUsers.push(newUser);
      
      localStorage.setItem('users', JSON.stringify(existingUsers));
      alert('Kayıt başarılı!');
      router.push('/signin'); 
    } catch (err) {
      setError('Kayıt sırasında bir hata oluştu.');
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Kayıt Ol</h1>
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
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Şifreyi tekrar girin"
        className={styles.input}
      />
      <button 
        onClick={handleSaveCredentials}
        className={styles.button}
      >
        Kayıt Ol
      </button>
      <p className={styles.loginLink}>
        Zaten hesabın var mı?{' '}
        <span onClick={() => router.push('/signin')} style={{ cursor: 'pointer', color: 'blue' }}>
          Giriş yap
        </span>
      </p>
    </div>
  );
}

