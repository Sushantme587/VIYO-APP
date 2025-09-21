'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './loading';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return <Loading />;
}
