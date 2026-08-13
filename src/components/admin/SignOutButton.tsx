'use client';

import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import styles from './admin.module.scss';

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut();
    router.push('/admin/sign-in');
    router.refresh();
  }

  return (
    <button type="button" className={styles.signOutBtn} onClick={handleSignOut}>
      Wyloguj się
    </button>
  );
}
