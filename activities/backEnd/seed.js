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
    thumbnail: "https://placehold.co/300x300?text=USB-C+Fast+Charger+65W",
    tags: ["charger", "usb-c", "fast charging", "gan"]
  },
  {
    name: "Lightning to USB Cable 1m",
    slug: "lightning-usb-cable-1m",
    description: "MFi-certified Lightning cable for iPhone, iPad, and iPod. Supports fast charging and data sync.",
    price: 19.99,
    category: "Cables",
    stock: 100,
    isFeatured: false,
    isActive: true,
    thumbnail: "https://placehold.co/300x300?text=Lightning+to+USB+Cable+1m",
    tags: ["cable", "lightning", "mfi", "apple"]
  },
  {
    name: "HDMI Cable 4K 2m",
    slug: "hdmi-cable-4k-2m",
    description: "Premium HDMI 2.0 cable supporting 4K@60Hz, HDR, and Dolby Atmos. Perfect for connecting monitors and TVs.",
    price: 24.99,
    category: "Cables",
    stock: 75,
    isFeatured: true,
    isActive: true,
    thumbnail: "https://placehold.co/300x300?text=HDMI+Cable+4K+2m",
    tags: ["cable", "hdmi", "4k", "video"]
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
    thumbnail: "https://placehold.co/300x300?text=Tempered+Glass+Screen+Protector",
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
    thumbnail: "https://placehold.co/300x300?text=Wireless+Charging+Pad+15W",
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
    thumbnail: "https://placehold.co/300x300?text=Phone+Case+Clear+Back",
    tags: ["phone case", "clear case", "protection"]
  },
  
  // Computer Parts
  {
    name: "External SSD 1TB NVMe",
    slug: "external-ssd-1tb-nvme",
    description: "Portable NVMe SSD with read speeds up to 1050MB/s. USB-C 3.2 Gen 2 interface. Compact aluminum design.",
    price: 109.99,
    category: "Storage",
    stock: 30,
    isFeatured: true,
    isActive: true,
    thumbnail: "https://placehold.co/300x300?text=External+SSD+1TB+NVMe",
    tags: ["ssd", "external storage", "nvme", "portable"]
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
    thumbnail: "https://placehold.co/300x300?text=USB+Hub+7-Port",
    tags: ["usb hub", "usb 3.0", "hub", "accessories"]
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
    thumbnail: "https://placehold.co/300x300?text=Mechanical+Keyboard+Switches+Red",
    tags: ["keyboard switches", "mechanical", "cherry mx", "red"]
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
    thumbnail: "https://placehold.co/300x300?text=Wireless+Earbuds+TWS",
    tags: ["earbuds", "tws", "bluetooth", "wireless audio"]
  },
  {
    name: "3.5mm Audio Cable 1.5m",
    slug: "audio-cable-35mm-15m",
    description: "Gold-plated connectors, oxygen-free copper wiring. Compatible with headphones, speakers, and audio devices.",
    price: 9.99,
    category: "Audio",
    stock: 120,
    isFeatured: false,
    isActive: true,
    thumbnail: "https://placehold.co/300x300?text=3.5mm+Audio+Cable+1.5m",
    tags: ["audio cable", "3.5mm", "aux", "headphone cable"]
  },
  {
    name: "USB-C to 3.5mm Adapter",
    slug: "usb-c-to-35mm-adapter",
    description: "USB-C to 3.5mm headphone jack adapter. Supports DAC and remote control. Plug and play.",
    price: 8.99,
    category: "Audio",
    stock: 90,
    isFeatured: false,
    isActive: true,
    thumbnail: "https://placehold.co/300x300?text=USB-C+to+3.5mm+Adapter",
    tags: ["adapter", "usb-c", "3.5mm", "audio"]
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
    thumbnail: "https://placehold.co/300x300?text=Power+Bank+20000mAh",
    tags: ["power bank", "portable charger", "20000mah", "battery"]
  },
  {
    name: "Power Bank 10000mAh Slim",
    slug: "power-bank-10000mah-slim",
    description: "Slim and lightweight power bank. Fast charging support. Perfect for travel.",
    price: 24.99,
    category: "Power Banks",
    stock: 55,
    isFeatured: false,
    isActive: true,
    thumbnail: "https://placehold.co/300x300?text=Power+Bank+10000mAh+Slim",
    tags: ["power bank", "portable charger", "10000mah", "slim"]
  },
  
  // Tools & Repair
  {
    name: "Phone Repair Tool Kit",
    slug: "phone-repair-tool-kit",
    description: "Complete repair tool kit for smartphones. Includes screwdriver set, pry tools, suction cup, and mat.",
    price: 29.99,
    category: "Tools",
    stock: 35,
    isFeatured: false,
    isActive: true,
    thumbnail: "https://placehold.co/300x300?text=Phone+Repair+Tool+Kit",
    tags: ["repair kit", "tools", "screwdriver", "phone repair"]
  },
  {
    name: "Cable Management Kit",
    slug: "cable-management-kit",
    description: "Cable organizer kit with clips, ties, and adhesive mounts. Keep your desk tidy.",
    price: 14.99,
    category: "Accessories",
    stock: 65,
    isFeatured: false,
    isActive: true,
    thumbnail: "https://placehold.co/300x300?text=Cable+Management+Kit",
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