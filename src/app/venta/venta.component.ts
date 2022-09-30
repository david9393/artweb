import { Component, OnInit } from '@angular/core';
import { Storage, ref,uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ArtworkService } from '../services/artwork.service';
import { Artwork } from '../shared/models/Artwork';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  items: MenuItem[]=[];
  typesArtworks :string[] = ['pictóricas','escultóricas','musicales','literales','teatrales','cinematográficas','escénicas'];
  file:any
  constructor(private router: Router,
    private messageService: MessageService,
    private artworkService: ArtworkService,
    private storage: Storage) { }

  ngOnInit(): void {
    this.items = [
      {label: 'home', icon: 'pi pi-fw pi-home' ,command: (event) => this.onItemClick(event) },
      {label: 'venta', icon: 'pi pi-fw pi-file',command: (event) => this.onItemClick(event)},
      {label: 'compra', icon: 'pi pi-shopping-cart',command: (event) => this.onItemClick(event)},
      {label: 'login', icon: 'pi pi-sign-out',command: (event) => this.onItemClick(event)}
    ];
  }
  artworkForm = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true,validators:Validators.required}),
    price: new FormControl<number>(0, {nonNullable: true,validators:Validators.required}),
    photo: new FormControl<string>('', {nonNullable: true}),
    photoFile: new FormControl(null),
    author: new FormControl<string>('', {nonNullable: true,validators:Validators.required}),
    type: new FormControl<string>('', {nonNullable: true,validators:Validators.required}),
  });

  onItemClick(event:any){
    this.router.navigate([event.item.label]);
    console.log(event.item.label);
  }

  async OnSubmit(){ 
    if (this.artworkForm.invalid) {
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'verifique formulario incompleto'});
      return;
    }

    if (this.file==null || this.file==undefined) {
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'verifique falta una imagen'});
      return;
    }

    let artwork:Artwork = this.artworkForm.getRawValue()
    artwork.active=true;
    artwork.userId=Number(localStorage.getItem("userid"))
    await this.uploadImage()
    .then(response =>{artwork.photo=response})
    .catch(error =>{
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'ocurrio un error subiendo la imagen'});
      return;
    })

    this.artworkService.Add(artwork).subscribe({
      next:  (data) => {
        this.messageService.add({severity:'success', summary: 'Succes', detail: 'se creo correctamente la obra de arte'});
      },
      error:(error) => {
        this.messageService.add({severity:'warn', summary: 'Warn', detail: 'error al crear la obra de arte'});
      },
   });
   
   this.artworkForm.reset()
  }
  loadImage($event:any) {
    this.file =$event.target.files[0]
  }
  async uploadImage() : Promise<string>{
    let image:string = 'images/'+this.file.name;
    let path=''
    const imgref= ref(this.storage,image)
    await uploadBytes(imgref,this.file)
     .then(response => {path=response.ref.fullPath})
     .catch(error =>{console.log(error)})
    
     await getDownloadURL(ref(this.storage, path))
     .then(response => {path=response})
     .catch(error =>{console.log(error)})
     console.log(path)
     return path
  }
}
