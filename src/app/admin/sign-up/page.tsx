import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { user } from '@/lib/db/schema';
import AdminAuthForm from '@/components/admin/AdminAuthForm';

export const metadata = {
  title: 'Panel administracyjny - utwórz konto',
};

export default async function AdminSignUpPage() {
  const session = await auth.api.getSession({ headers: headers() });

  if (session?.user) {
    redirect('/admin');
  }

  // Only allow creating the very first admin account. Once one exists,
  // sign-up is disabled and everyone must use /admin/sign-in instead.
  const existing = await db.select({ id: user.id }).from(user).limit(1);

  if (existing.length > 0) {
    redirect('/admin/sign-in');
  }

  return <AdminAuthForm mode="sign-up" />;
}
