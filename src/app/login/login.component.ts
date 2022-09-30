import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/User';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl?: string;
  constructor( private messageService: MessageService,
    private router: Router,
    private userService: UserService,) { }

  ngOnInit(): void {
  }


   loginForm = new FormGroup({
    email: new FormControl('', {nonNullable: true}),
    password: new FormControl('', {nonNullable: true}),
  });
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    let user :User= this.loginForm.value

    this.userService.Login(user).subscribe({
      next:  (data) => {
        this.loading = false;
        localStorage.setItem("userid", data.data);
        this.router.navigate(['/home']);
      },
      error:(error) => {
        this.loading = false;
        this.messageService.add({severity:'warn', summary: 'Warn', detail: 'usuario incorrecto'});
      },
   });
}

}
