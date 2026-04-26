export interface Product {
    id: number;
    name: string;
    originalPrice: number;
    discountedPrice: number;
    image: string; // Path to an image file, or empty for "coming soon"
}

export const fakeProducts: Product[] = [
    { id: 1, name: "Prince's Ego Tee", originalPrice: 60.00, discountedPrice: 35.00, image: '/assets/images/fakeConsumerPage/papershirt.png' },
    { id: 2, name: "Bralette", originalPrice: 40.00, discountedPrice: 28.00, image: '/assets/images/fakeConsumerPage/limitededitionbra.jpg' },
    { id: 3, name: "Paperbag Long Tee", originalPrice: 70.00, discountedPrice: 45.00, image: '/assets/images/fakeConsumerPage/paperbagtee.png' },
    { id: 4, name: "Paperbag Clutch", originalPrice: 130.00, discountedPrice: 85.00, image: '/assets/images/fakeConsumerPage/paperbagclutch.png' },
    { id: 5, name: "", originalPrice: 0, discountedPrice: 0, image: '' },
    { id: 6, name: "", originalPrice: 0, discountedPrice: 0, image: '' },
    { id: 7, name: "", originalPrice: 0, discountedPrice: 0, image: '' },
    { id: 8, name: "", originalPrice: 0, discountedPrice: 0, image: '' },
];
