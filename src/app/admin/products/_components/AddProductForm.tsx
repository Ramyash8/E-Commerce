
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createProduct, type Product } from "@/lib/products";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  stock: z.coerce.number().min(0, "Stock must be a positive number"),
  category: z.string().min(1, "Category is required"),
  featured: z.boolean().default(false),
  image1: z.string().url("Must be a valid URL").min(1, "At least one image is required"),
  image2: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  image3: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  image4: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
});

type AddProductFormValues = z.infer<typeof formSchema>;

interface AddProductFormProps {
    onProductAdded: (newProduct: Product) => void;
    setOpen: (open: boolean) => void;
}

export function AddProductForm({ onProductAdded, setOpen }: AddProductFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      featured: false,
      image1: "",
      image2: "",
      image3: "",
      image4: "",
    },
  });

  const onSubmit = async (values: AddProductFormValues) => {
    setIsLoading(true);
    try {
        const images = [values.image1, values.image2, values.image3, values.image4].filter(Boolean) as string[];

        const newProductData = {
            name: values.name,
            description: values.description,
            price: values.price,
            stock: values.stock,
            category: values.category,
            featured: values.featured,
            images,
            rating: 0, // New products start with 0 rating
            reviews: [], // New products start with no reviews
        };
      
        const newProduct = await createProduct(newProductData);

        toast({
            title: "Product Created!",
            description: `${newProduct.name} has been successfully added.`,
        });

        onProductAdded(newProduct);
        setOpen(false);
        form.reset();

    } catch (error: any) {
        toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem creating the product.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                    <Input placeholder="e.g., Classic White Sneakers" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                    <Textarea placeholder="Describe the product..." {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="grid grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="e.g., 5999.00" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="e.g., 75" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
             <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                    <Input placeholder="e.g., Sneakers" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="image1"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Image URL 1 (Required)</FormLabel>
                    <FormControl>
                    <Input placeholder="https://example.com/image.png" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="text-xs text-muted-foreground">You can add up to 3 more optional image URLs.</div>
            <FormField
                control={form.control}
                name="image2"
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                    <Input placeholder="Optional Image URL 2" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="image3"
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                    <Input placeholder="Optional Image URL 3" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="image4"
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                    <Input placeholder="Optional Image URL 4" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Feature this product?
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
                 <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                 <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Adding Product..." : "Add Product"}
                </Button>
            </div>
        </form>
    </Form>
  );
}
