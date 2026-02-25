export interface Project {
    id: string;
    title: string;
    desc: string;
    longDesc: string;
    date: string;
    featured: boolean;
    thumbnailUrl: string;
    images: string[];
}

export const projectsData: Project[] = [
    {
        id: 'the-paperbag-princess',
        title: "The Paperbag Princess",
        desc: 'A high fashion paper world exploring a gender flipped fairytale.',
        longDesc: "For this production of The Paperbag Princess, I explored the dichotomy between the rigid Athenian court and the wild, untamed nature of the fairy realm. I focused on heavily textured organic materials—raw silks, dyed wools, and structured leather—to create a world that felt both ancient and dreamlike.",
        date: '2026',
        featured: true,
        thumbnailUrl: '/assets/images/projects/paperbag-princess/princess-back.PNG',
        images: [
            '/assets/images/projects/paperbag-princess/princess-back.PNG',
            '/assets/images/projects/paperbag-princess/princess-front.PNG'
        ]
    },

    {
        id: 'Coco',
        title: 'Coco',
        desc: 'A redesign of Pixar\'s Coco, celebrating mexican heritage and parade culture.',
        longDesc: 'Working as a wardrobe assistant on The Crucible involved rigorous historical research into 17th-century Puritan dress. We utilized a highly restricted color palette of blacks, greys, and muddy browns to emphasize the psychological oppression of the narrative. My role involved sourcing period-accurate fabrics and assisting with the distressing process to give the garments a lived-in, arduous feel.',
        date: '2024',
        featured: true,
        thumbnailUrl: '/assets/images/projects/Coco/pepita-white.png',
        images: [
            '/assets/images/projects/Coco/pepita-white.png',
            '/assets/images/projects/Coco/pepita-illustration.png'
        ]
    },
    {
        id: 'spaceship-earth',
        title: 'Spaceship Earth',
        desc: 'A festival set 100 years from now.',
        longDesc: 'This vision for Cabaret leaned heavily into the concept of beautiful decay. The costumes of the Kit Kat Klub performers were designed to look stunning from afar but revealed frayed edges, tarnished sequins, and repaired tears up close—mirroring the societal collapse occurring outside the club walls.',
        date: '2025',
        featured: true,
        thumbnailUrl: '/assets/images/projects/spaceship-earth/coral-illustration.PNG',
        images: [
            '/assets/images/projects/spaceship-earth/coral-illustration.PNG',
            '/assets/images/projects/cabaret-1.jpg',
            '/assets/images/projects/cabaret-2.jpg'
        ]
    },
    {
        id: 'macbeth',
        title: 'Macbeth',
        desc: 'Avant-garde, brutalist armor and stark silhouettes.',
        longDesc: "As a concept artist for this avant-garde interpretation of Macbeth, I focused on geometric, brutalist silhouettes. The armor designs were inspired by modern architectural forms rather than traditional historical armor, symbolizing the cold, rigid mechanical nature of Macbeth's ambition.",
        date: '2023',
        featured: false,
        thumbnailUrl: '/assets/images/projects/macbeth-thumb.jpg',
        images: [
            '/assets/images/projects/macbeth-1.jpg'
        ]
    }
];
