
"use client";

import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { createOrder, type Order } from "@/lib/orders";
import { Skeleton } from "@/components/ui/skeleton";
import { getSampleUserId } from "@/lib/users";

type NewOrderData = Omit<Order, 'id' | 'createdAt'>;

export default function CheckoutPage() {
    const { user, loading } = useAuth();
    const { cart, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const { toast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login?redirect=/checkout");
        }
        if (!loading && cart.length === 0) {
            router.push("/cart");
        }
    }, [user, loading, cart, router]);

    const handlePlaceOrder = async () => {
        if (!user || cart.length === 0) return;
        
        setIsProcessing(true);

        const sampleUserId = await getSampleUserId(user.email!);

        if (!sampleUserId) {
            toast({
                title: "User not found",
                description: "Could not find a sample user ID to associate with the order.",
                variant: "destructive"
            });
            setIsProcessing(false);
            return;
        }

        try {
            const newOrderData: NewOrderData = {
                userId: sampleUserId,
                customer: user.displayName || "Anonymous",
                date: new Date().toLocaleDateString('en-CA'),
                status: 'Processing',
                total: `₹${totalPrice.toFixed(2)}`,
                items: cart.map(item => ({ name: item.name, quantity: item.quantity })),
            }
            
            const newOrderId = await createOrder(newOrderData);
            
            toast({
                title: "Order Placed!",
                description: "Your order has been successfully placed."
            });

            clearCart();
            router.push(`/account/orders/${newOrderId}`);

        } catch (error) {
            console.error("Error creating order:", error);
            toast({
                title: "Order failed",
                description: "There was a problem placing your order.",
                variant: "destructive"
            });
            setIsProcessing(false);
        }
    }

    if (loading || !user) {
        return (
            <div className="container mx-auto px-4 md:px-6 py-12">
                <Skeleton className="h-8 w-1/4 mb-8" />
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <Skeleton className="h-96 w-full" />
                    </div>
                    <div>
                        <Skeleton className="h-64 w-full" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <h1 className="text-3xl md:text-4xl font-bold font-headline mb-8">Checkout</h1>
            <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Information</CardTitle>
                            <CardDescription>Enter your delivery address.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="first-name">First Name</Label>
                                    <Input id="first-name" placeholder="John" defaultValue={user.displayName?.split(' ')[0]} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="last-name">Last Name</Label>
                                    <Input id="last-name" placeholder="Doe" defaultValue={user.displayName?.split(' ')[1]}/>
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" placeholder="123 Commerce St" />
                            </div>
                             <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" placeholder="Mumbai" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Input id="state" placeholder="Maharashtra" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">ZIP Code</Label>
                                    <Input id="zip" placeholder="400001" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                     <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Payment Information</CardTitle>
                            <CardDescription>This is a demo. No real payment will be processed.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input id="card-number" placeholder="**** **** **** 1234" />
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input id="expiry" placeholder="MM/YY" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-1 sticky top-24">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <p>{item.name} <span className="text-muted-foreground">x{item.quantity}</span></p>
                                    <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                            <Separator />
                            <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p>₹{totalPrice.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Shipping</p>
                                <p>Free</p>
                            </div>
                            <Separator />
                             <div className="flex justify-between font-bold text-lg">
                                <p>Total</p>
                                <p>₹{totalPrice.toFixed(2)}</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" size="lg" onClick={handlePlaceOrder} disabled={isProcessing}>
                                {isProcessing ? "Processing..." : "Place Order"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
