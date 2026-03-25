import Product from "./models/Product.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const sampleProducts = [
  // Cables & Chargers
  {
    name: "USB-C Fast Charger 65W",
    slug: "usb-c-fast-charger-65w",
    description: "High-speed USB-C charger compatible with laptops, tablets, and smartphones. Features GaN technology for efficient charging.",
    price: 45.99,
    category: "Chargers",
    stock: 50,
    isFeatured: true,
    isActive: true,
    thumbnail: "http://localhost:3000/images/chargepad.jpg",
    tags: ["charger", "usb-c", "fast charging", "gan"]
  },
  {
    name: "Micro USB Cable 1m",
    slug: "micro-usb-cable-1m",
    description: "Durable micro USB cable for Android devices. Supports fast charging and data sync.",
    price: 9.99,
    category: "Cables",
    stock: 100,
    isFeatured: false,
    isActive: true,
    thumbnail: "http://localhost:3000/images/microusbcable.jpg",
    tags: ["cable", "micro usb", "android", "charging"]
  },
  {
    name: "USB Hub 7-Port",
    slug: "usb-hub-7-port",
    description: "Powered USB 3.0 hub with 7 ports. Includes individual power switches and LED indicators.",
    price: 34.99,
    category: "Computer Accessories",
    stock: 45,
    isFeatured: false,
    isActive: true,
    thumbnail: "http://localhost:3000/images/usb.jpg",
    tags: ["usb hub", "usb 3.0", "hub", "accessories"]
  },
  
  // Phone Accessories
  {
    name: "Tempered Glass Screen Protector",
    slug: "tempered-glass-screen-protector",
    description: "9H hardness tempered glass screen protector with oleophobic coating. Bubble-free installation.",
    price: 12.99,
    category: "Phone Accessories",
    stock: 200,
    isFeatured: false,
    isActive: true,
    thumbnail: "https://placehold.co/300x300?text=Screen+Protector",
    tags: ["screen protector", "tempered glass", "protection"]
  },
  {
    name: "Wireless Charging Pad 15W",
    slug: "wireless-charging-pad-15w",
    description: "Qi-certified wireless charger compatible with all Qi-enabled devices. LED indicator and foreign object detection.",
    price: 29.99,
    category: "Chargers",
    stock: 60,
    isFeatured: true,
    isActive: true,
    thumbnail: "http://localhost:3000/images/chargepad.jpg",
    tags: ["wireless charger", "qi", "charging pad"]
  },
  {
    name: "Phone Case - Clear Back",
    slug: "phone-case-clear-back",
    description: "Crystal clear PC back case with TPU bumper. Slim design with drop protection.",
    price: 15.99,
    category: "Phone Accessories",
    stock: 150,
    isFeatured: false,
    isActive: true,
    thumbnail: "https://placehold.co/300x300?text=Phone+Case",
    tags: ["phone case", "clear case", "protection"]
  },
  
  // Computer Parts
  {
    name: "External Hard Drive 1TB",
    slug: "external-hard-drive-1tb",
    description: "Portable external hard drive with USB 3.0. Fast and reliable storage for all your files.",
    price: 59.99,
    category: "Storage",
    stock: 30,
    isFeatured: true,
    isActive: true,
    thumbnail: "http://localhost:3000/images/externalharddrive.jpg",
    tags: ["external hard drive", "storage", "usb 3.0", "portable"]
  },
  {
    name: "ASUS ROG Keyboard",
    slug: "asus-rog-keyboard",
    description: "Gaming mechanical keyboard with RGB lighting and Cherry MX switches.",
    price: 149.99,
    category: "Computer Accessories",
    stock: 25,
    isFeatured: true,
    isActive: true,
    thumbnail: "http://localhost:3000/images/asusrogkeyboard.jpg",
    tags: ["keyboard", "gaming", "mechanical", "rgb"]
  },
  {
    name: "Mechanical Keyboard Switches - Red",
    slug: "mechanical-keyboard-switches-red",
    description: "Cherry MX Red equivalent linear switches. 50 million keystroke lifespan. Pack of 90 switches.",
    price: 24.99,
    category: "Computer Accessories",
    stock: 80,
    isFeatured: false,
    isActive: true,
    thumbnail: "http://localhost:3000/images/mekred.jpg",
    tags: ["keyboard switches", "mechanical", "cherry mx", "red"]
  },
  {
    name: "Gaming Mouse",
    slug: "gaming-mouse",
    description: "High-performance gaming mouse with adjustable DPI and RGB lighting.",
    price: 39.99,
    category: "Computer Accessories",
    stock: 50,
    isFeatured: true,
    isActive: true,
    thumbnail: "http://localhost:3000/images/gamemouse.jpg",
    tags: ["mouse", "gaming", "rgb", "dpi"]
  },
  
  // Audio
  {
    name: "Wireless Earbuds TWS",
    slug: "wireless-earbuds-tws",
    description: "True wireless earbuds with Bluetooth 5.0. 24-hour total playtime with charging case. Touch controls.",
    price: 49.99,
    category: "Audio",
    stock: 70,
    isFeatured: true,
    isActive: true,
    thumbnail: "http://localhost:3000/images/wirelessbuds.jpg",
    tags: ["earbuds", "tws", "bluetooth", "wireless audio"]
  },
  {
    name: "Premium Headphones",
    slug: "premium-headphones",
    description: "High-quality over-ear headphones with noise cancellation and premium sound quality.",
    price: 89.99,
    category: "Audio",
    stock: 25,
    isFeatured: true,
    isActive: true,
    thumbnail: "http://localhost:3000/images/headphones.jpg",
    tags: ["headphones", "audio", "noise cancellation", "bluetooth"]
  },
  
  // Laptop
  {
    name: "Lenovo Laptop",
    slug: "lenovo-laptop",
    description: "Powerful laptop for work and play. Intel processor, 8GB RAM, 256GB SSD.",
    price: 599.99,
    category: "Laptops",
    stock: 15,
    isFeatured: true,
    isActive: true,
    thumbnail: "http://localhost:3000/images/lenovo.jpg",
    tags: ["laptop", "lenovo", "computer", "portable"]
  },
  
  // Power Banks
  {
    name: "Power Bank 20000mAh",
    slug: "power-bank-20000mah",
    description: "High-capacity power bank with 20,000mAh. Dual USB output, USB-C input/output. LED power indicator.",
    price: 39.99,
    category: "Power Banks",
    stock: 40,
    isFeatured: true,
    isActive: true,
    thumbnail: "https://placehold.co/300x300?text=Power+Bank",
    tags: ["power bank", "portable charger", "20000mah", "battery"]
  },
  
  // Tools & Repair
  {
    name: "Phone Repair Tool Kit",
    slug: "phone-repair-tool-kit",
    description: "Complete repair tool kit for smartphones. Includes screwdriver set, pry tools, suction cup, and mat.",
    price: 29.99,
    category: "Tools",
    stock: 35,
    isFeatured: true,
    isActive: true,
    thumbnail: "https://placehold.co/300x300?text=Repair+Kit",
    tags: ["repair kit", "tools", "screwdriver", "phone repair"]
  },
  {
    name: "Cable Management Kit",
    slug: "cable-management-kit",
    description: "Cable organizer kit with clips, ties, and adhesive mounts. Keep your desk tidy.",
    price: 14.99,
    category: "Accessories",
    stock: 65,
    isFeatured: true,
    isActive: true,
    thumbnail: "https://placehold.co/300x300?text=Cable+Management",
    tags: ["cable management", "organizer", "desk accessories"]
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    console.log("Connected to database");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully added ${createdProducts.length} sample products`);

    console.log("Seed completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();