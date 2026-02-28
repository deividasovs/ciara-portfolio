export interface Product {
    id: number;
    name: string;
    originalPrice: number;
    discountedPrice: number;
    image: string; // Emoji character (e.g., "👕") or path to an image file (e.g., "/images/product.jpg")
}

export const fakeProducts: Product[] = [
    { id: 1, name: "Essential Linen Tee", originalPrice: 89999.99, discountedPrice: 0.99, image: "/assets/images/fakeConsumerPage/papershirt.png" },
    { id: 2, name: "Ribbed Cotton Socks", originalPrice: 45000.00, discountedPrice: 0.49, image: "🧦" },
    { id: 3, name: "Tailored Denim", originalPrice: 125000.00, discountedPrice: 1.99, image: "👖" },
    { id: 4, name: "Oversized Knit", originalPrice: 67890.00, discountedPrice: 0.79, image: "🧥" },
    { id: 5, name: "Midi Slip Dress", originalPrice: 234567.89, discountedPrice: 1.49, image: "👗" },
    { id: 6, name: "Leather Sneakers", originalPrice: 99999.99, discountedPrice: 0.69, image: "👟" },
    { id: 7, name: "Wide Brim Hat", originalPrice: 34500.50, discountedPrice: 0.39, image: "🎩" },
    { id: 8, name: "High-Rise Shorts", originalPrice: 56789.00, discountedPrice: 0.89, image: "🩳" },
];
