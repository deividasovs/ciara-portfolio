export interface Project {
    id: string;
    title: string;
    desc: string;
    longDesc: string;
    date: string;
    featured: boolean;
}

export const projectsData: Project[] = [
    {
        id: 'midsummer-nights-dream',
        title: "A Midsummer Night's Dream",
        desc: 'Ethereal organic textures and structured fairy courts.',
        longDesc: "For this production of A Midsummer Night's Dream, I explored the dichotomy between the rigid Athenian court and the wild, untamed nature of the fairy realm. I focused on heavily textured organic materials—raw silks, dyed wools, and structured leather—to create a world that felt both ancient and dreamlike.",
        date: '2025',
        featured: true
    },

    {
        id: 'the-crucible',
        title: 'The Crucible',
        desc: 'Historically accurate Salem attire with muted, oppressive palettes.',
        longDesc: 'Working as a wardrobe assistant on The Crucible involved rigorous historical research into 17th-century Puritan dress. We utilized a highly restricted color palette of blacks, greys, and muddy browns to emphasize the psychological oppression of the narrative. My role involved sourcing period-accurate fabrics and assisting with the distressing process to give the garments a lived-in, arduous feel.',
        date: '2024',
        featured: true
    },
    {
        id: 'cabaret',
        title: 'Cabaret',
        desc: 'Berlin underground glamour meeting decaying elegance.',
        longDesc: 'This vision for Cabaret leaned heavily into the concept of beautiful decay. The costumes of the Kit Kat Klub performers were designed to look stunning from afar but revealed frayed edges, tarnished sequins, and repaired tears up close—mirroring the societal collapse occurring outside the club walls.',
        date: '2023',
        featured: false
    },
    {
        id: 'macbeth',
        title: 'Macbeth',
        desc: 'Avant-garde, brutalist armor and stark silhouettes.',
        longDesc: "As a concept artist for this avant-garde interpretation of Macbeth, I focused on geometric, brutalist silhouettes. The armor designs were inspired by modern architectural forms rather than traditional historical armor, symbolizing the cold, rigid mechanical nature of Macbeth's ambition.",
        date: '2023',
        featured: false
    }
];
