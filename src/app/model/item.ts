export interface Item {
    id: string;
    type: string;
    description: string;
    shape: string;
    labels: string[];
    changed?: boolean;
}
