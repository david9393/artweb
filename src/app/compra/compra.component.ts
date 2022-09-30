import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { SalesService } from '../services/sales.service';
import { SalesArtwork } from '../shared/models/SalesArtwork';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  items: MenuItem[]=[];
  sales:SalesArtwork[]=[]

  constructor(
    private router: Router,
    private messageService: MessageService,
    private salesService: SalesService,
  ) { }

  ngOnInit(): void {
    this.items = [
      {label: 'home', icon: 'pi pi-fw pi-home' ,command: (event) => this.onItemClick(event) },
      {label: 'venta', icon: 'pi pi-fw pi-file',command: (event) => this.onItemClick(event)},
      {label: 'compra', icon: 'pi pi-shopping-cart',command: (event) => this.onItemClick(event)},
      {label: 'login', icon: 'pi pi-sign-out',command: (event) => this.onItemClick(event)}
    ];
    this.loadSales();
  }

  onItemClick(event:any){
    this.router.navigate([event.item.label]);
  }

  loadSales(){ 
    let userId:number=Number(localStorage.getItem("userid"));
    this.salesService.GetUser(userId).subscribe({
      next:  (data) => {
        this.sales=data;
      },
      error:(error) => {
        this.messageService.add({severity:'warn', summary: 'Warn', detail: 'ocurrio un error'});
      },
   });
  }
}
