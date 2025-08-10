
"use client";

import { useState } from 'react';
import { getFirestore, writeBatch, doc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { app } from '@/lib/firebase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// Seed data is now managed in a separate markdown file for clarity.
const SEED_DATA_PLACEHOLDER = `
[
  {
    "id": "1",
    "name": "Classic Biker Jacket",
    "price": 4999,
    "description": "A timeless biker jacket made from high-quality faux leather. Perfect for any occasion, offering both style and durability. Features multiple pockets and a comfortable inner lining.",
    "images": [
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000410499092004/jD16RqXjMT-1.jpg",
      "https://placehold.co/600x600.png",
      "https://placehold.co/600x600.png",
      "https://placehold.co/600x600.png"
    ],
    "rating": 4.8,
    "category": "Apparel",
    "featured": true,
    "stock": 15,
    "reviews": [
      { "id": "rev1", "author": "Priya S.", "rating": 5, "comment": "Absolutely love this jacket! The quality is amazing for the price.", "date": "2024-05-10" },
      { "id": "rev2", "author": "Rohan M.", "rating": 4, "comment": "Great fit and very stylish. The material is a bit stiff at first.", "date": "2024-05-12" }
    ]
  }
]
`;

export default function SeedDatabasePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const { toast } = useToast();
  const db = getFirestore(app);
  const [productJson, setProductJson] = useState('');

  const handleSeed = async () => {
    setIsLoading(true);
    setLogs([]);

    const log = (message: string) => {
      setLogs(prev => [...prev, message]);
    }

    try {
      log('Starting database seed process...');
      
      const products = JSON.parse(productJson);
      
      if (!Array.isArray(products) || products.length === 0) {
        throw new Error('Invalid or empty JSON data for products.');
      }
      
      log(`Found ${products.length} products to seed.`);
      const productBatch = writeBatch(db);
      products.forEach((product: any) => {
        if (!product.id) {
          log(`Skipping product with no ID: ${product.name}`);
          return;
        }
        const docRef = doc(db, "products", product.id.toString());
        const { id, ...productData } = product;
        productBatch.set(docRef, productData);
      });
      await productBatch.commit();
      log('✅ Successfully seeded products collection.');

      log('🎉 Database seeding complete!');
      toast({
        title: "Database Seeded!",
        description: "Your Firestore database has been populated with the provided product data.",
      });

    } catch (error: any) {
      console.error("Error seeding database:", error);
      log(`❌ Error: ${error.message}`);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was an error seeding the database. Check the JSON format and console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Seed Database</CardTitle>
          <CardDescription>
            Paste your product data as a JSON array below to seed the database.
            This action will overwrite any existing product documents with the same IDs.
            Refer to `firestore-seed-data.md` for the correct format.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product-json">Product Data (JSON)</Label>
            <Textarea 
              id="product-json"
              placeholder={SEED_DATA_PLACEHOLDER.trim()}
              value={productJson}
              onChange={(e) => setProductJson(e.target.value)}
              className="min-h-[200px] font-mono text-xs"
            />
          </div>

          <Button onClick={handleSeed} disabled={isLoading || !productJson}>
            {isLoading ? 'Seeding...' : 'Start Seeding'}
          </Button>

          {logs.length > 0 && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Seeding Log</AlertTitle>
              <AlertDescription>
                <pre className="mt-2 rounded-md bg-muted p-4 text-xs font-mono overflow-x-auto max-h-[300px]">
                  {logs.join('\n')}
                </pre>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
