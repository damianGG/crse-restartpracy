'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import styles from './admin.module.scss';

export default function AdminAuthForm({
  mode,
}: {
  mode: 'sign-in' | 'sign-up';
}) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result =
        mode === 'sign-up'
          ? await authClient.signUp.email({ email, password, name })
          : await authClient.signIn.email({ email, password });

      if (result.error) {
        setError(
          result.error.message ??
            'Nie udało się zalogować. Sprawdź dane i spróbuj ponownie.'
        );
        setLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Wystąpił błąd. Spróbuj ponownie.');
      setLoading(false);
    }
  }

  return (
    <div className={styles.authWrapper}>
      <div className={styles.authCard}>
        <p className={styles.authKicker}>Panel administracyjny</p>
        <h1 className={styles.authTitle}>
          {mode === 'sign-up' ? 'Utwórz konto administratora' : 'Zaloguj się'}
        </h1>
        <p className={styles.authSubtitle}>
          {mode === 'sign-up'
            ? 'To jednorazowa konfiguracja - utworzysz jedyne konto administratora strony.'
            : 'Zaloguj się, aby zarządzać treścią strony.'}
        </p>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {mode === 'sign-up' && (
            <div className={styles.field}>
              <label htmlFor="name">Imię i nazwisko</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="email">Adres e-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Hasło</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete={
                mode === 'sign-up' ? 'new-password' : 'current-password'
              }
            />
          </div>

          {error && <p className={styles.authError}>{error}</p>}

          <button type="submit" className={styles.authSubmit} disabled={loading}>
            {loading
              ? 'Proszę czekać...'
              : mode === 'sign-up'
                ? 'Utwórz konto'
                : 'Zaloguj się'}
          </button>
        </form>
      </div>
    </div>
  );
}
