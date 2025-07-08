export interface IFormInput extends Record<string, unknown> {
    name?: string;
    title?: string;
    description?: string;
    id?: string;
    rating?: number;
    search?: string;
}