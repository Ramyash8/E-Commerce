
import { getOrderById, type Order } from "@/lib/orders";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Package, CheckCircle, Truck, XCircle, CircleDotDashed } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderTrackingPageProps {
    params: {
        id: string;
    };
}

const statusMap = {
    'Processing': { icon: CircleDotDashed, text: "Your order is being processed.", step: 1 },
    'Shipped': { icon: Truck, text: "Your order has been shipped.", step: 2 },
    'Fulfilled': { icon: CheckCircle, text: "Your order has been delivered.", step: 3 },
    'Cancelled': { icon: XCircle, text: "Your order has been cancelled.", step: 0 },
    'Pending': { icon: CircleDotDashed, text: "Your order is pending confirmation.", step: 0 },
};

export default async function OrderTrackingPage({ params }: OrderTrackingPageProps) {
    const order = await getOrderById(params.id);

    if (!order) {
        notFound();
    }
    
    const currentStatus = statusMap[order.status] || statusMap['Pending'];
    
    const trackingSteps = [
        { name: "Processing", icon: CircleDotDashed, step: 1 },
        { name: "Shipped", icon: Truck, step: 2 },
        { name: "Delivered", icon: CheckCircle, step: 3 },
    ];

    const orderTotal = typeof order.total === 'string' ? parseFloat(order.total) : order.total;

    return (
        <div className="container mx-auto px-4 md:px-6 py-12">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Order Tracking</CardTitle>
                    <CardDescription>
                        Track the status of your order <span className="font-semibold text-primary">{order.id}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 bg-muted/50 rounded-lg mb-8">
                        <div>
                            <p className="font-semibold text-lg">Current Status</p>
                            <div className="flex items-center gap-2 mt-2">
                               <currentStatus.icon className={cn("h-6 w-6", order.status === 'Cancelled' ? 'text-destructive' : 'text-primary' )} />
                               <p className="text-lg font-medium">{order.status}</p>
                            </div>
                            <p className="text-muted-foreground mt-1">{currentStatus.text}</p>
                        </div>
                        <div className="text-left md:text-right">
                           <p className="text-muted-foreground">Order Date</p>
                           <p className="font-semibold">{order.date}</p>
                        </div>
                    </div>
                    
                    {order.status !== 'Cancelled' && (
                        <div className="mb-8">
                           <h3 className="text-xl font-headline mb-6 text-center">Your Order's Journey</h3>
                           <div className="relative flex justify-between items-center w-full max-w-2xl mx-auto">
                              <div className="absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2" />
                              <div 
                                className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 transition-all duration-500" 
                                style={{ width: `${((currentStatus.step -1) / (trackingSteps.length -1)) * 100}%` }}
                              />

                              {trackingSteps.map((step) => {
                                const isCompleted = currentStatus.step >= step.step;
                                const isCurrent = currentStatus.step === step.step;
                                return (
                                  <div key={step.name} className="z-10 flex flex-col items-center">
                                    <div className={cn("h-10 w-10 rounded-full flex items-center justify-center border-4 transition-colors duration-500",
                                        isCompleted ? "bg-primary border-primary-foreground text-primary-foreground" : "bg-card border-border"
                                    )}>
                                        <step.icon className={cn("h-6 w-6", !isCompleted && "text-muted-foreground")} />
                                    </div>
                                    <p className={cn("mt-2 font-semibold", isCurrent && "text-primary")}>{step.name}</p>
                                  </div>
                                )
                              })}
                           </div>
                        </div>
                    )}


                    <Separator className="my-8" />
                    
                    <div>
                        <h3 className="text-xl font-headline mb-4">Order Summary</h3>
                        <div className="space-y-2">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <p>{item.name} <span className="text-muted-foreground">x {item.quantity}</span></p>
                                </div>
                            ))}
                        </div>
                        <Separator className="my-4"/>
                        <div className="flex justify-between font-bold text-lg">
                           <p>Total</p>
                           <p>{'\u20B9'}{orderTotal.toFixed(2)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
