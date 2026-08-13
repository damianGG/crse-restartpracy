'use client';

import { useFormStatus } from 'react-dom';
import styles from './admin.module.scss';

export default function SubmitButton({
  children,
  pendingText,
  variant = 'primary',
  size,
}: {
  children: React.ReactNode;
  pendingText?: string;
  variant?: 'primary' | 'danger';
  size?: 'sm';
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${styles.btn} ${
        variant === 'danger' ? styles.btnDanger : styles.btnPrimary
      } ${size === 'sm' ? styles.btnSm : ''}`}
    >
      {pending ? pendingText ?? 'Zapisywanie...' : children}
    </button>
  );
}
