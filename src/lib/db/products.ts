
export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  rating: number;
  category: string;
  featured: boolean;
  stock: number;
  reviews: Review[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Biker Jacket',
    price: 4999.00,
    description: 'A timeless biker jacket made from high-quality faux leather. Perfect for any occasion, offering both style and durability. Features multiple pockets and a comfortable inner lining.',
    images: [
        'https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000410499092004/jD16RqXjMT-1.jpg',
        'https://placehold.co/600x600.png',
        'https://placehold.co/600x600.png',
        'https://placehold.co/600x600.png',
    ],
    rating: 4.8,
    category: 'Apparel',
    featured: true,
    stock: 15,
    reviews: [
        { id: 'rev1', author: 'Priya S.', rating: 5, comment: 'Absolutely love this jacket! The quality is amazing for the price.', date: '2024-05-10'},
        { id: 'rev2', author: 'Rohan M.', rating: 4, comment: 'Great fit and very stylish. The material is a bit stiff at first.', date: '2024-05-12'},
    ],
  },
  {
    id: '2',
    name: 'Noise-Cancelling Headphones',
    price: 7999.00,
    description: 'Immerse yourself in sound with these premium wireless headphones. Featuring active noise-cancellation, long-lasting battery life, and superior comfort for all-day listening.',
    images: [
        'https://cdn.thewirecutter.com/wp-content/media/2023/09/noise-cancelling-headphone-2048px-0880.jpg?auto=webp&quality=75&width=1024',
        'https://placehold.co/600x600.png',
        'https://placehold.co/600x600.png'
    ],
    rating: 4.9,
    category: 'Electronics',
    featured: true,
    stock: 30,
    reviews: [
        { id: 'rev3', author: 'Sneha K.', rating: 5, comment: 'Best headphones I have ever owned. The noise cancellation is next level.', date: '2024-04-22'},
        { id: 'rev4', author: 'Arjun P.', rating: 5, comment: 'Incredible sound quality and very comfortable to wear for long periods.', date: '2024-04-25'},
        { id: 'rev5', author: 'Vikram B.', rating: 4, comment: 'Great sound, but the app could be better.', date: '2024-05-01'},
    ],
  },
  {
    id: '3',
    name: 'Elegant Steel Watch',
    price: 3499.00,
    description: 'Elegant and simple, this beautiful watch is the perfect accessory. It features a stainless steel case, a sleek metal strap, and a clean, easy-to-read face.',
    images: [
        'https://images.meesho.com/images/products/417828343/7ayyy_512.webp',
        'https://placehold.co/600x600.png'
    ],
    rating: 4.6,
    category: 'Accessories',
    featured: true,
    stock: 50,
    reviews: [
        { id: 'rev6', author: 'Meera V.', rating: 5, comment: 'So elegant and looks much more expensive than it is!', date: '2024-05-15'},
    ],
  },
  {
    id: '4',
    name: 'Himalayan Herbal Tea Set',
    price: 1499.00,
    description: 'A curated set of premium herbal teas from the Himalayas. Includes Tulsi, Ashwagandha, and Ginger teas. A perfect gift for any tea lover.',
    images: [
        'https://jivisa.in/cdn/shop/files/JiViSa-Premium-Loose-Leaf-Tea-Gift-Box-JiViSa-828.jpg?v=1684807135',
        'https://placehold.co/600x600.png'
    ],
    rating: 4.7,
    category: 'Home Goods',
    featured: true,
    stock: 100,
    reviews: [
      { id: 'rev7', author: 'Anjali R.', rating: 5, comment: 'Beautiful packaging and the teas are so fragrant and calming.', date: '2024-05-20'},
      { id: 'rev8', author: 'Karan G.', rating: 4, comment: 'Good quality tea. A bit pricey but worth it for a gift.', date: '2024-05-21'},
    ],
  },
  {
    id: '5',
    name: 'Modern Cotton Kurta',
    price: 2499.00,
    description: 'A stylish and comfortable pure cotton kurta for men. Perfect for festive occasions or casual wear. Features intricate embroidery and a modern fit.',
    images: [
        'https://images.pexels.com/photos/1661471/pexels-photo-1661471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://placehold.co/600x600.png'
    ],
    rating: 4.5,
    category: 'Apparel',
    featured: false,
    stock: 45,
    reviews: [
        { id: 'rev9', author: 'Siddharth J.', rating: 5, comment: 'Excellent quality cotton and very comfortable to wear. The fit is perfect.', date: '2024-05-18'},
    ],
  },
  {
    id: '9',
    name: 'Retro High-Top Sneakers',
    price: 8999.00,
    description: 'Step up your style game with these iconic high-top sneakers. A classic design that never goes out of fashion.',
    images: [
        'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://placehold.co/600x600.png',
        'https://placehold.co/600x600.png'
    ],
    rating: 4.9,
    category: 'Sneakers',
    featured: false,
    stock: 22,
    reviews: [
        { id: 'rev10', author: 'Aditya R.', rating: 5, comment: 'These are just amazing. Classic look and super comfortable.', date: '2024-05-25'},
        { id: 'rev11', author: 'Neha B.', rating: 5, comment: 'Bought them for my brother and he loves them! Great quality.', date: '2024-05-26'},
    ],
  },
  {
    id: '10',
    name: 'Urban Runner Sneakers',
    price: 7599.00,
    description: 'Lightweight and comfortable, these sneakers are perfect for your daily run or a casual day out.',
    images: [
        'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://placehold.co/600x600.png'
    ],
    rating: 4.7,
    category: 'Sneakers',
    featured: false,
    stock: 40,
    reviews: [
        { id: 'rev12', author: 'Raj V.', rating: 4, comment: 'Really good for running, very lightweight. Support is decent.', date: '2024-05-11'},
        { id: 'rev13', author: 'Ishita P.', rating: 5, comment: 'So comfortable for walking all day. And they look great!', date: '2024-05-14'},
    ],
  },
  {
    id: '11',
    name: 'Classic White Sneakers',
    price: 5999.00,
    description: 'A must-have in every wardrobe. These versatile white sneakers go with any outfit.',
    images: [
        'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://placehold.co/600x600.png',
        'https://placehold.co/600x600.png'
    ],
    rating: 4.8,
    category: 'Sneakers',
    featured: false,
    stock: 75,
    reviews: [
        { id: 'rev14', author: 'Aisha K.', rating: 5, comment: 'Perfect white sneakers. They are comfortable and easy to clean.', date: '2024-05-28'},
        { id: 'rev15', author: 'Ravi S.', rating: 5, comment: 'Goes with everything. A true classic. Highly recommended.', date: '2024-05-29'},
        { id: 'rev16', author: 'Sunita M.', rating: 4, comment: 'Good value for money. They crease a bit easily though.', date: '2024-05-30'},
    ],
  },
  {
    id: '12',
    name: 'Luxury Chronograph Watch',
    price: 24999.00,
    description: 'A statement of class and precision. This luxury chronograph watch features a stainless steel bracelet and a detailed dial.',
    images: [
        'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://placehold.co/600x600.png'
    ],
    rating: 4.9,
    category: 'Watches',
    featured: false,
    stock: 12,
    reviews: [
      { id: 'rev17', author: 'Arjun T.', rating: 5, comment: 'An absolute masterpiece. Worth every penny. The craftsmanship is impeccable.', date: '2024-05-22'},
      { id: 'rev18', author: 'Nikhil C.', rating: 5, comment: 'Stunning watch, gets compliments everywhere I go.', date: '2024-05-23'},
    ],
  },
  {
    id: '13',
    name: 'Vintage Leather Watch',
    price: 9999.00,
    description: 'A timeless piece with a genuine leather strap and a classic dial. Perfect for the discerning gentleman.',
    images: [
        'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://placehold.co/600x600.png'
    ],
    rating: 4.7,
    category: 'Watches',
    featured: false,
    stock: 35,
    reviews: [
      { id: 'rev19', author: 'Vivek A.', rating: 5, comment: 'The leather is high quality and the watch has a great vintage feel. Love it.', date: '2024-05-19'},
    ],
  },
  {
    id: '14',
    name: 'Gaming Headset with Mic',
    price: 6499.00,
    description: 'Crystal clear audio and a noise-cancelling microphone make this headset a must-have for any serious gamer.',
    images: [
        'https://images.pexels.com/photos/7915416/pexels-photo-7915416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://placehold.co/600x600.png',
        'https://placehold.co/600x600.png'
    ],
    rating: 4.6,
    category: 'Gaming',
    featured: false,
    stock: 50,
    reviews: [
        { id: 'rev20', author: 'GamerGuy88', rating: 5, comment: 'Awesome sound quality, my teammates can hear me clearly.', date: '2024-05-05'},
        { id: 'rev21', author: 'Leena G.', rating: 4, comment: 'Very comfortable for long gaming sessions. Mic is decent.', date: '2024-05-08'},
    ],
  },
  {
    id: '15',
    name: 'Ergonomic Gaming Chair',
    price: 18999.00,
    description: 'Game in comfort for hours with this ergonomic chair, featuring adjustable armrests and lumbar support.',
    images: [
        'https://images.pexels.com/photos/7238759/pexels-photo-7238759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://placehold.co/600x600.png'
    ],
    rating: 4.8,
    category: 'Gaming',
    featured: false,
    stock: 20,
    reviews: [
      { id: 'rev22', author: 'ProGamer', rating: 5, comment: 'This chair saved my back. The lumbar support is fantastic.', date: '2024-05-24'},
      { id: 'rev23', author: 'Ankit D.', rating: 4, comment: 'Solid chair, assembly was a bit tricky but worth it.', date: '2024-05-27'},
    ],
  },
  {
    id: '16',
    name: 'Mechanical Gaming Keyboard',
    price: 8999.00,
    description: 'RGB backlit mechanical keyboard with tactile switches for the ultimate gaming experience.',
    images: [
        'https://images.pexels.com/photos/841228/pexels-photo-841228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://placehold.co/600x600.png',
        'https://placehold.co/600x600.png',
        'https://placehold.co/600x600.png'
    ],
    rating: 4.9,
    category: 'Gaming',
    featured: false,
    stock: 30,
    reviews: [
      { id: 'rev24', author: 'KeyMaster', rating: 5, comment: 'The clicky keys are so satisfying. RGB effects are brilliant!', date: '2024-05-16'},
      { id: 'rev25', author: 'Divya S.', rating: 5, comment: 'Best keyboard I have ever used for gaming and typing.', date: '2024-05-17'},
    ],
  },
];
