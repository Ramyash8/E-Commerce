
import { Suspense } from 'react';
import { LoginPageClient } from './_components/LoginPageClient';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

function LoginPageLoading() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-4 w-4/5 mt-2" />
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-4 w-3/5 mt-4" />
                </CardFooter>
            </Card>
        </div>
    )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageLoading />}>
      <LoginPageClient />
    </Suspense>
  );
}
