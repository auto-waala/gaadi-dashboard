
export interface CategoryTree {
    id: number;
    name: string;
    code: string;
    slug: string;
    iconUrl?: string;
    displayOrder: number;
    children: CategoryTree[];
}
