import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  items: MenuItem[]=[];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {label: 'home', icon: 'pi pi-fw pi-home' ,command: (event) => this.onItemClick(event) },
      {label: 'venta', icon: 'pi pi-fw pi-pencil',command: (event) => this.onItemClick(event)}
  ];
  }
  onItemClick(event:any){
    this.router.navigate([event.item.label]);
    console.log(event.item.label);
  }

}
