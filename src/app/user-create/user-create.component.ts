import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/User';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl?: string;
  constructor( private messageService: MessageService,
    private router: Router,
    private userService: UserService,) { }

  ngOnInit(): void {
  }


   userForm = new FormGroup({
    email: new FormControl('', {nonNullable: true}),
    name: new FormControl('', {nonNullable: true}),
    password: new FormControl('', {nonNullable: true}),
    confirmpassword: new FormControl('', {nonNullable: true}),
  });
  get f() { return this.userForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
        return;
    }

    if (this.userForm.value.password!==this.userForm.value.confirmpassword) {
      this.messageService.add({severity:'warn', summary: 'Warn', detail: 'Password no coincide'});
      return
    }

    this.loading = true;
    let user :User= this.userForm.value

    this.userService.Add(user).subscribe({
      next:  (data) => {
        this.loading = false;
        console.log(data);
        localStorage.setItem("userid", data.data);
        this.router.navigate(['/home']);
      },
      error:(error) => {
        this.loading = false;
        this.messageService.add({severity:'warn', summary: 'Warn', detail: 'error registrando el usuario'});
      },
   });
}

}
