import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ArtworkService } from '../services/artwork.service';
import { SalesService } from '../services/sales.service';
import { Artwork } from '../shared/models/Artwork';
import { SalesArtwork } from '../shared/models/SalesArtwork';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  artworks: Artwork[]=[]
  artwork:Artwork=new Artwork();
  responsiveOptions:any;
  items: MenuItem[]=[];
  displayModal: boolean=false;

  constructor( 
    private router: Router,
    private messageService: MessageService,
    private artworkService: ArtworkService,
    private salesService: SalesService, ) { }

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
    {label: 'venta', icon: 'pi pi-fw pi-file',command: (event) => this.onItemClick(event)},
    {label: 'compra', icon: 'pi pi-shopping-cart',command: (event) => this.onItemClick(event)},
    {label: 'login', icon: 'pi pi-sign-out',command: (event) => this.onItemClick(event)}
  ];
}

artworkForm = new FormGroup({
  address: new FormControl<string>('', {nonNullable: true,validators:Validators.required}),
  paymentMethod: new FormControl<string>('', {nonNullable: true,validators:Validators.required}),
});

  LoadArtworks() {

    this.artworkService.All().subscribe({
      next:  (data) => {
        this.artworks = data;
      },
      error:(error) => {
        this.messageService.add({severity:'warn', summary: 'Warn', detail: 'usuario incorrecto'});
      },
   });
  }

  onItemClick(event:any){
    this.router.navigate([event.item.label]);
  }
  showModalDialog(item:Artwork) {
    this.artworkForm.reset()
    this.artwork=item;
    this.displayModal = true;
  }
  confirmSales() {
    if(this.artworkForm.invalid){
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'faltan datos requeridos'});
      return;
    }

    let salesArtwork :SalesArtwork= {
      userId:Number(localStorage.getItem("userid")),
      date: new Date(Date.now()),
      artworkId:this.artwork.id!,
      address:this.artworkForm.controls.address.value,
      payment:this.artworkForm.controls.paymentMethod.value
    }
    this.salesService.Add(salesArtwork).subscribe({
      next:  (data) => {
        this.displayModal = false;
        this.LoadArtworks();
      },
      error:(error) => {
        this.displayModal = false;
        this.messageService.add({severity:'warn', summary: 'Warn', detail: 'ocurrio un error'});
      },
   });
   
  }
}
