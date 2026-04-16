export interface Product {
    id: number;
    name: string;
    originalPrice: number;
    discountedPrice: number;
    image: string; // Emoji character (e.g., "👕") or path to an image file (e.g., "/images/product.jpg")
}

export const fakeProducts: Product[] = [
    { id: 1, name: "Prince's Ego Tee", originalPrice: 60.00, discountedPrice: 35.00, image: '/assets/images/fakeConsumerPage/papershirt.png' },
    { id: 2, name: "Barcode Socks", originalPrice: 20.00, discountedPrice: 5.00, image: '🧦' },
    { id: 3, name: "Paperclip Skirt", originalPrice: 120.00, discountedPrice: 80.00, image: '📎' },
    { id: 4, name: "Lingerie Set", originalPrice: 40.00, discountedPrice: 28.00, image: '/assets/images/fakeConsumerPage/limitededitionbra.jpg' },
    { id: 5, name: "Paperbag Long Tee", originalPrice: 70.00, discountedPrice: 45.00, image: '/assets/images/fakeConsumerPage/paperbagtee.png' },
    { id: 6, name: "Paperbag Clutch", originalPrice: 130.00, discountedPrice: 85.00, image: '/assets/images/fakeConsumerPage/paperbagclutch.png' },
];
