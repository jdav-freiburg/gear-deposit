export interface Item {
    id: string;
    type: string;
    description: string;
    shape: string;
    labels: string[];
    flagged?: boolean;
}
