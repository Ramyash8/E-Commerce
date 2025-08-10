
import { Suspense } from 'react';
import { AccountPageClient } from './_components/AccountPageClient';
import { Skeleton } from '@/components/ui/skeleton';

function AccountPageLoading() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </div>
      <Skeleton className="w-full h-96" />
    </div>
  )
}

export default function AccountPage() {
  return (
    <Suspense fallback={<AccountPageLoading />}>
      <AccountPageClient />
    </Suspense>
  );
}
