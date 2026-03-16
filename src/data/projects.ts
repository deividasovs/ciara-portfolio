export interface ProjectImage {
    url: string;
    credit?: string;
    height?: string;
}

export interface ProjectRow {
    layout: '1-col' | '2-col' | '3-col' | '4-col' | '2x1' | '4x4' | '2-left-1-right' | string;
    height?: string;
    images: (string | ProjectImage)[];
}

export interface Project {
    id: string;
    title: string;
    desc: string;
    longDesc: string;
    date: string;
    featured: boolean;
    thumbnailUrl: string;
    thumbnailCredit?: string;
    topHorizontalImage?: string;
    topHorizontalCredit?: string;
    images: (string | ProjectImage | ProjectRow)[];
    theme?: 'light' | 'dark';
    layout?: '1-col' | '2-col' | '3-col' | '4-col' | '2x1' | '4x4' | '2-left-1-right' | string; // Adjust the grid layout for project images
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
            {
                url: '/assets/images/projects/paperbag-princess/princess-back.PNG',
                credit: 'Credit: Ciara Burns'
            },
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
        topHorizontalImage: '/assets/images/projects/spaceship-earth/coral-collage.png',
        images: [
            '/assets/images/projects/spaceship-earth/coralposterized1.png',
            '/assets/images/projects/spaceship-earth/coral-illustration.PNG'
        ],
        theme: 'dark'
    },
    {
        id: 'macbeth',
        title: 'Macbeth',
        desc: '.',
        longDesc: "A redesign project of Macbeth by William Shakespeare, this brief challenged me to reinterpret the play in a randomly assigned historical period, using orange waxed cotton paired with donated Harris Tweed. I reimagined Macbeth as a Macaroni man — a flamboyant, extravagantly dressed gentleman of the 1770s. The exaggerated silhouette, bold colour, and rich textures reflect his ambition, insecurity, and descent into excess, using 18th-century dandyism to mirror his psychological unraveling. I drafted and adapted the garment from an original historical pattern, refining it to modern proportions while maintaining period authenticity.",
        date: '2025',
        featured: false,
        thumbnailUrl: '/assets/images/projects/Macbeth/macbeth-back.png',
        topHorizontalImage: '/assets/images/projects/Macbeth/macbeth-back.png',
        images: [
            '/assets/images/projects/Macbeth/macbeth-back.png'
        ]
    },
    {
        id: 'l\'enfant et les sortilèges',
        title: 'l\'enfant et les sortilèges',
        desc: 'A redesign project of L\'enfant et les sortilèges by Maurice Ravel',
        longDesc: "Designed for the children\'s French opera L\'Ènfant et les Sortilèges, this costume draws inspiration from vibrant and bold aesthetic of the French circus. Its colourful design is intended to captivate and engage young audiences. Additionally, it features integrated lighting along the bottom, adding an extra layer of magic and visual interest.",
        date: '2024',
        featured: false,
        layout: '3-col',
        thumbnailUrl: '/assets/images/projects/circus/circus-ecashow.png',
        topHorizontalImage: '/assets/images/projects/circus/circus-ecashow.png',
        images: [
            '/assets/images/projects/circus/circus-ecashow.png',
            {
                layout: '2-left-1-right',
                images: [
                    '/assets/images/projects/circus/circus-ecashow.png',
                    {
                        url: '/assets/images/projects/circus/smile.JPG',
                        credit: 'Credit: Random Sample Credit',
                        height: '60%'
                    },
                    {
                        url: '/assets/images/projects/circus/circus-ecashow2.png',
                        credit: 'Credit: Ciara Burns',
                    },
                    {
                        url: '/assets/images/projects/circus/circus-ecashow2.png',
                        credit: 'Credit: Ciara Burns',
                    }
                ]
            },
        ]
    },
    {
        id: 'theres-a-wocket-in-my-pocket',
        title: "There's a Wocket in my pocket",
        desc: 'A Dr. Seuss inspired costume design.',
        longDesc: 'A Dr. Seuss inspired costume design.',
        date: '2024',
        featured: false,
        thumbnailUrl: '/assets/images/projects/dr-seuss/drseussy.png',
        topHorizontalImage: '/assets/images/projects/dr-seuss/drseussy.png',
        images: [
            '/assets/images/projects/dr-seuss/drseussy.png'
        ]
    }
];