
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { getOrdersByUserId, type Order } from "@/lib/orders";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getUserById as fetchUser, User as UserType } from "@/lib/users";

export function AccountPageClient() {
  const { user: authUser, loading: authLoading, signOut } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [viewedUser, setViewedUser] = useState<UserType | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  const userIdFromQuery = searchParams.get('userId');

  useEffect(() => {
    const initializePage = async () => {
      setPageLoading(true);
      setOrdersLoading(true);

      if (authLoading) return; // Wait until auth state is resolved

      let targetUserId: string | null = null;
      
      // Admin is viewing a specific user's profile
      if (userIdFromQuery && authUser?.email === 'admin@shopsphere.com') {
        const user = await fetchUser(userIdFromQuery);
        if (user) {
          setViewedUser(user);
          targetUserId = user.id;
        } else {
          router.push('/admin/users'); // User not found
          return;
        }
      } else if (!authUser) {
        router.push("/login");
        return;
      } else {
        // Regular user viewing their own profile
        setViewedUser(null); 
        targetUserId = authUser.uid;
      }

      if (targetUserId) {
        const userOrders = await getOrdersByUserId(targetUserId);
        setOrders(userOrders);
      } else {
        setOrders([]);
      }
      
      setOrdersLoading(false);
      setPageLoading(false);
    };

    initializePage();
  }, [authUser, authLoading, router, userIdFromQuery]);

  const user = viewedUser || (authUser ? { id: authUser.uid, name: authUser.displayName, email: authUser.email, orders:0, totalSpent: 0 } : null);

  if (pageLoading || authLoading || !user) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="mb-8">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </div>
        <Skeleton className="w-full h-96" />
      </div>
    );
  }

  const isViewingOwnProfile = !viewedUser;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline">{isViewingOwnProfile ? "My Account" : `${user.name}'s Account`}</h1>
        <p className="text-muted-foreground">{isViewingOwnProfile ? 'Manage your account settings and view order history.' : `Viewing details for ${user.email}`}</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={user.name || ""} disabled={!isViewingOwnProfile} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email || ""} disabled />
              </div>
              {isViewingOwnProfile && <Button>Save Changes</Button>}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Here's a list of past purchases.</CardDescription>
            </CardHeader>
            <CardContent>
                {ordersLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                ) : orders.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={order.status === 'Fulfilled' ? "default" : order.status === 'Pending' ? "secondary" : "destructive"}>
                                            {order.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">{'\u20B9'}{(typeof order.total === 'string' ? parseFloat(order.total) : order.total).toFixed(2)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/account/orders/${order.id}`}>
                                                Track Order
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        <p>This user has no past orders.</p>
                         {isViewingOwnProfile && <Button variant="link" asChild><a href="/shop">Start shopping</a></Button>}
                    </div>
                )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
          {isViewingOwnProfile && <Button variant="destructive" onClick={signOut}>Log Out</Button>}
      </div>
    </div>
  );
}
