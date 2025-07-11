"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
    <div >
      <h1 >Giriş Yap</h1>
      {error && <p>{error}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Kullanıcı adı"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Şifre"
      
      />
      <button 
        onClick={handleSignIn}
      >
        Giriş Yap
      </button>
      <p>
        Hesabın yok mu?{' '}
        <span onClick={() => router.push('/signup')} style={{ cursor: 'pointer', color: 'blue' }}>
          Kayıt ol
        </span>
      </p>
    </div>
  );

}
