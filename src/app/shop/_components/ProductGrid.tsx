
"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  categories: string[];
}

function Filters({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 text-lg">Category</h3>
        <RadioGroup
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="cat-all" />
            <Label htmlFor="cat-all">All</Label>
          </div>
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <RadioGroupItem
                value={category}
                id={`cat-${category.toLowerCase()}`}
              />
              <Label htmlFor={`cat-${category.toLowerCase()}`}>
                {category}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}

export function ProductGrid({ products, categories }: ProductGridProps) {
  const [sortOption, setSortOption] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered =
      selectedCategory === "all"
        ? products
        : products.filter((p) => p.category === selectedCategory);

    switch (sortOption) {
      case "price-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating-desc":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "featured":
      default:
        return filtered.sort((a,b) => (a.featured ? -1 : 1));
    }
  }, [products, sortOption, selectedCategory]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Desktop Sidebar Filters */}
      <aside className="hidden lg:block lg:col-span-1">
        <div className="sticky top-24">
          <h2 className="font-headline text-2xl font-semibold mb-4">Filters</h2>
          <Filters 
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:col-span-3">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground text-sm">
            Showing {filteredAndSortedProducts.length} products
          </p>

          {/* Mobile Filter Trigger */}
          <div className="lg:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="font-headline text-2xl">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="py-8">
                        <Filters 
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={(value) => {
                                setSelectedCategory(value);
                                setIsSheetOpen(false);
                            }}
                        />
                    </div>
                </SheetContent>
            </Sheet>
          </div>

          {/* Sorting Dropdown */}
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating-desc">Rating: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Product Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="font-headline text-2xl">No Products Found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
