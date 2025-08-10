
"use client";

import type { Product } from "@/lib/products";
import { useCart } from "@/hooks/useCart";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
}

export function AddToCartButton({ product, quantity = 1, className }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    addToCart(product, quantity);
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <Button onClick={handleAddToCart} className={className} size="lg" disabled={product.stock === 0}>
      <ShoppingCart className="mr-2 h-5 w-5" />
      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
    </Button>
  );
}
