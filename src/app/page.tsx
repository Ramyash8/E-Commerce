import Link from 'next/link';
import { getFeaturedProducts, getProductsByCategory } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { ProductCarousel } from '@/components/ProductCarousel';
import BlurText from '@/components/BlurText'; 
import TrueFocus from '@/components/TrueFocus';
import GradientText from '@/components/GradientText'; 
import Threads from '@/components/Threads'; 
import SplitText from '@/components/SplitText';


export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const sneakerProducts = await getProductsByCategory('Sneakers');
  const electronicsProducts = await getProductsByCategory('Electronics');
  const homeDecorProducts = await getProductsByCategory('Home Decor');
  const bookProducts = await getProductsByCategory('Books');
  const personalCareProducts = await getProductsByCategory('Personal Care');
  const gamingProducts = await getProductsByCategory('Gaming');

  return (
    <div className="flex flex-col">
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card/50 overflow-hidden">
  {/* 🔹 Threads as animated background */}
  <div className="absolute inset-0 z-0">
    <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
  </div>

  <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
    <div className="max-w-3xl mx-auto">
      {/* ✅ BlurText for first part */}
      <BlurText
        text="Curated Collections,"
        delay={150}
        animateBy="words"
        direction="top"
        className="text-4xl font-headline font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
      />

      {/* ✅ TrueFocus for second part */}
      <TrueFocus
        sentence="Unbeatable Prices"
        manualMode={false}
        blurAmount={5}
        borderColor="red"
        animationDuration={2}
        pauseBetweenAnimations={1}
      />

      {/* ✅ GradientText for subheading */}
      <p className="mt-6 text-lg leading-8 text-muted-foreground">
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={3}
          showBorder={false}
          className="custom-class"
        >
          Discover your new favorite essentials. Quality, style, and
          convenience, all in one place.
        </GradientText>
      </p>

      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button asChild size="lg">
          <Link href="/shop">Shop All Collections</Link>
        </Button>
      </div>
    </div>
  </div>
</section>



      <section id="featured" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-2 mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">
              <SplitText
                  text="Featured Products"
                  className="text-2xl font-semibold text-center"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                  
                />
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Handpicked for you. Explore our most popular items.
            </p>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="trending-sneakers" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-2 mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
              <SplitText
                  text="Trending in Sneakers"
                  className="text-2xl font-semibold text-center"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                  
                />
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Check out the latest drops and timeless classics.
            </p>
          </div>
          <ProductCarousel products={sneakerProducts} />
        </div>
      </section>

      <section id="tech" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-2 mb-12 text-center">
            <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl">
               <SplitText
                  text="Level Up Your Tech"
                  className="text-2xl font-semibold text-center"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="center"
                  
                />
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              From premium audio to smart home devices, find the best electronics here.
            </p>
          </div>
          <ProductCarousel products={electronicsProducts} />
        </div>
      </section>
      
      <section id="gaming-gear" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-2 mb-12 text-center">
            <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl md:text-6xl">
              Dominate the Game
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Equip yourself with the best gaming gear for the ultimate experience.
            </p>
          </div>
          <ProductCarousel products={gamingProducts} />
        </div>
      </section>

      <section id="home-decor" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-2 mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
              Elevate Your Space
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find the perfect pieces to complete your home.
            </p>
          </div>
          <ProductCarousel products={homeDecorProducts} />
        </div>
      </section>

      <section id="books" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-2 mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
              For the Bookworms
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover captivating novels and timeless lessons.
            </p>
          </div>
          <ProductCarousel products={bookProducts} />
        </div>
      </section>

      <section id="personal-care" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 text-center">
           <div className="space-y-2 mb-12">
            <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl">
              Personal Care Essentials
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
              Refresh and revitalize with our selection of personal care products.
            </p>
          </div>
          <ProductCarousel products={personalCareProducts} />
        </div>
      </section>
    </div>
  );
}  