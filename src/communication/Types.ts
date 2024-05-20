export interface User {
    id: number,
    firstname: string;
    lastname: string;
    email: string;
}
export interface Travel {
    id: number;
    country: string;
    city: string;
    startDate: string;
    endDate: string;
    description: string;
    rate: number
}