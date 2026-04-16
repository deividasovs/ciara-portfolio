import { Project, ProjectImage } from '../../data/projects';

const toImage = (item: string | ProjectImage): ProjectImage =>
    typeof item === 'string' ? { url: item } : item;

export const flattenImages = (project: Project): ProjectImage[] => {
    const heroUrl = project.topHorizontalImage || project.thumbnailUrl;
    const heroCredit = project.topHorizontalCredit || project.thumbnailCredit;
    const hero: ProjectImage = { url: heroUrl, credit: heroCredit };

    const rest: ProjectImage[] = [];
    const seen = new Set<string>([heroUrl]);

    const push = (img: ProjectImage) => {
        if (seen.has(img.url)) return;
        seen.add(img.url);
        rest.push(img);
    };

    project.images.forEach((item: any) => {
        if (typeof item === 'string') {
            push({ url: item });
            return;
        }
        if ('url' in item) {
            push(item as ProjectImage);
            return;
        }
        if ('layout' in item) {
            item.images.forEach((inner: string | ProjectImage) => push(toImage(inner)));
        }
    });

    return [hero, ...rest];
};
