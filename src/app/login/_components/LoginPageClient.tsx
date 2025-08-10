
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { createUser, getUserById } from "@/lib/users";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export function LoginPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { auth } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Check if user exists in Firestore 'users' collection
      const userDoc = await getUserById(user.uid);
      if (!userDoc) {
        // If not, create them. This handles users who authenticated but don't have a DB entry.
        await createUser({
          id: user.uid,
          name: user.displayName || 'New User',
          email: user.email!,
          orders: 0,
          totalSpent: "₹0.00"
        });
      }

      toast({
        title: "Signed in!",
        description: "You have been successfully signed in.",
      });
      const redirectUrl = searchParams.get('redirect') || '/account';
      router.push(redirectUrl);
    } catch (error: any) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
