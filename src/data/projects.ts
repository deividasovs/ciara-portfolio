import { start } from "repl";

export interface Project {
    id: string;
    title: string;
    desc: string;
    longDesc: string;
    date: string;
    featured: boolean;
    thumbnailUrl: string;
    topHorizontalImage?: string;
    images: string[];
}

export const projectsData: Project[] = [
    {
        id: 'the-paperbag-princess',
        title: "The Paperbag Princess",
        desc: 'A high fashion paper world exploring a gender flipped fairytale.',
        longDesc: "Princess Elizabeth had all the dresses a storybook royal could dream of. But when a dragon scorches her castle, steals her prince, and leaves her with nothing but ashes and a paper bag, she doesn't crumble — she rises. In her shredded dignity and a makeshift outfit, she faces fire, tricks a monster, and saves the prince. But when he mocks her for how she looks, Elizabeth sees the truth: the fairytale isn’t real — but she is. She tears off the paper bag and becomes something new — a princess of her own making.Bold, raw, and reassembled, her final look is a declaration: no prince, no crown, no rules.Just power, paper, and pride.",
        date: '2026',
        featured: true,
        thumbnailUrl: '/assets/images/projects/paperbag-princess/princess-back.PNG',
        topHorizontalImage: '/assets/images/projects/paperbag-princess/prince.PNG', // Make sure to include this line in each different section if you want to have a different top image to the featured one. 
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
        date: '2026',
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
        desc: 'A bioluminescent festival',
        longDesc: 'This project envisions a sustainable music festival set 100 years from now. Inspired by bioluminescent organisms, I imagined a world where genetically modified plants provide natural lighting and clean air. From this idea, I designed characters that coexist with humans, with costumes reflecting bioluminescence and sustainable values. My final design was inspired by coral and made using discarded tent fabric, highlighting reuse and eco-conscious design in future performance.',
        date: '2025',
        featured: true,
        thumbnailUrl: '/assets/images/projects/spaceship-earth/coralposterized1.png',
        images: [
            '/assets/images/projects/spaceship-earth/coralposterized1.png',
            '/assets/images/projects/spaceship-earth/coralcollage.jpg'
        ]
    },
    {
        id: 'macbeth',
        title: 'Macbeth',
        desc: 'Avant-garde, brutalist armor and stark silhouettes.',
        longDesc: "As a concept artist for this avant-garde interpretation of Macbeth, I focused on geometric, brutalist silhouettes. The armor designs were inspired by modern architectural forms rather than traditional historical armor, symbolizing the cold, rigid mechanical nature of Macbeth's ambition.",
        date: '2025',
        featured: false,
        thumbnailUrl: '/assets/images/projects/macbeth-thumb.jpg',
        images: [
            '/assets/images/projects/macbeth-1.jpg'
        ]
    }
];
