import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export async function getUserId() {
  const session = await auth.api.getSession({ headers: headers() });

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  return session.user.id;
}
