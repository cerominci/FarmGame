"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
      const userData = localStorage.getItem('user_' + username);
      if (!userData) {
        setError('Kullanıcı bulunamadı.');
        return;
      }

      const user = JSON.parse(userData);
      if (user.password !== password) {
        setError('Şifre yanlış.');
        return;
      }

      localStorage.setItem('isLoggedIn', 'true');
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
