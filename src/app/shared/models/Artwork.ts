export class Artwork {
    id?:number;
    userId?: number;
    name: string="";
    price: number=0;
    photo: string="";
    author: string="";
    type: string="";
    active?: boolean;
}