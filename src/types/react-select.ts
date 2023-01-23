export interface Option {
    readonly value: string;
    readonly label: string;
}

export const OrderOptions: readonly Option[] = [
    { value: 'asc', label: 'Ascendiente' },
    { value: 'desc', label: 'Descendiente' },
]