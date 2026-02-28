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
        longDesc: 'Exploring the vibrant culture of Mexico and Dia de los Muertos through the lens of Pixar\'s Coco. This project is a celebration of life, death, and the importance of family and rememberance. Looking into both traditional Mexican dress and parade culture, bringing in elemnets of lantern puppetry to bring the alebrijes inspired spirit guides to life on stage.',
        date: '2026',
        featured: true,
        thumbnailUrl: '/assets/images/projects/coco/pepita-white.png',
        images: [
            '/assets/images/projects/coco/pepita-white.png',
            '/assets/images/projects/coco/pepita-illustration.png'
        ]
    },
    {
        id: 'spaceship-earth',
        title: 'Spaceship Earth',
        desc: 'A bioluminescent festival',
        longDesc: 'This project envisions a sustainable music festival set 100 years from now. Inspired by bioluminescent organisms, I imagined a world where genetically modified plants provide natural lighting and clean air. From this idea, I designed characters that coexist with humans, with costumes reflecting bioluminescence and sustainable values. My final design was inspired by coral and made using discarded tent fabric, highlighting reuse and eco-conscious design in future performance.',
        date: '2025',
        featured: true,
        thumbnailUrl: '/assets/images/projects/spaceship-earth/coral-illustration.PNG',
        topHorizontalImage: '/assets/images/projects/spaceship-earth/coralposterized1.png',
        images: [
            '/assets/images/projects/spaceship-earth/coralposterized1.png',
            '/assets/images/projects/spaceship-earth/coral-collage.png'
        ]
    },
    {
        id: 'macbeth',
        title: 'Macbeth',
        desc: '.',
        longDesc: "A redesign project of Macbeth by William Shakespeare, this brief challenged me to reinterpret the play in a randomly assigned historical period, using orange waxed cotton paired with donated Harris Tweed. I reimagined Macbeth as a Macaroni man — a flamboyant, extravagantly dressed gentleman of the 1770s. The exaggerated silhouette, bold colour, and rich textures reflect his ambition, insecurity, and descent into excess, using 18th-century dandyism to mirror his psychological unraveling. I drafted and adapted the garment from an original historical pattern, refining it to modern proportions while maintaining period authenticity.",
        date: '2025',
        featured: false,
        thumbnailUrl: '/assets/images/projects/Macbeth/macbethillustration-back.png',
        topHorizontalImage: '/assets/images/projects/Macbeth/macbethillustration-back.png',
        images: [
            '/assets/images/projects/Macbeth/macbethillustration-back.png'
        ]
    }
];
