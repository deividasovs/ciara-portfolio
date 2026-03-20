export interface Product {
    id: number;
    name: string;
    originalPrice: number;
    discountedPrice: number;
    image: string; // Emoji character (e.g., "👕") or path to an image file (e.g., "/images/product.jpg")
}

export const fakeProducts: Product[] = [
    { id: 1, name: "Prince's Ego Tee", originalPrice: 60.00, discountedPrice: 0.99, image: "" },
    { id: 2, name: "Barcode Socks", originalPrice: 20.00, discountedPrice: 0.49, image: "" },
    { id: 3, name: "Paperclip Skirt", originalPrice: 120.00, discountedPrice: 1.99, image: "" },
    { id: 4, name: "Lingerie Set", originalPrice: 40.00, discountedPrice: 0.79, image: "" },
    { id: 5, name: "Paperbag Long Tee", originalPrice: 70.00, discountedPrice: 1.49, image: "" },
    { id: 6, name: "Paperbag Clutch", originalPrice: 130.00, discountedPrice: 0.69, image: "" },
];
