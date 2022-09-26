import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Artwork } from '../shared/models/Artwork';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  artworks: Artwork[]=[]
  responsiveOptions:any;
  items: MenuItem[]=[];

  constructor( private router: Router) { }

  ngOnInit(): void {
    this.LoadArtworks();
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  this.items = [
    {label: 'home', icon: 'pi pi-fw pi-home' ,command: (event) => this.onItemClick(event) },
    {label: 'venta', icon: 'pi pi-fw pi-pencil',command: (event) => this.onItemClick(event)}
];
}

  LoadArtworks() {
    let artwork1:Artwork={id:1,name: 'name 1',price:45000,url:'/assets/car1.jpg/'}
    let artwork2:Artwork={id:1,name: 'name 2',price:26000,url:'/assets/car2.jpg/'}
    let artwork3:Artwork={id:1,name: 'name 3',price:38000,url:'/assets/car3.jpg/'}
    let artwork4:Artwork={id:1,name: 'name 4',price:15000,url:'/assets/car4.jpg/'}
    let artwork5:Artwork={id:1,name: 'name 4',price:15000,url:'/assets/car5.jpg/'}

    this.artworks.push(artwork1);
    this.artworks.push(artwork2);
    this.artworks.push(artwork3);
    this.artworks.push(artwork4);
    this.artworks.push(artwork5);

  }

  onItemClick(event:any){
    this.router.navigate([event.item.label]);
    console.log(event.item.label);
  }
}
