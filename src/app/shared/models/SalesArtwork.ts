import { Artwork } from "./Artwork";

export class SalesArtwork {
    id?:number;
    date?:Date;
    userId: number=0;
    artworkId:number=0;
    address:string='';
    payment: string="";
    artwork?:Artwork
}