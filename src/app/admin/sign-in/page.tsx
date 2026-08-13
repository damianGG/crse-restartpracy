import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import AdminAuthForm from '@/components/admin/AdminAuthForm';

export const metadata = {
  title: 'Panel administracyjny - logowanie',
};

export default async function AdminSignInPage() {
  const session = await auth.api.getSession({ headers: headers() });

  if (session?.user) {
    redirect('/admin');
  }

  return <AdminAuthForm mode="sign-in" />;
}
