import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading!: boolean;
  userExists!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      phone: '',
      address: '',
      gender: '',
      email: '',
      password: '',
      password_confirm: '',
    });
  }

  submit(): void {
    this.loading = true;
    this.authService.register(this.form.getRawValue()).subscribe(
      () => this.router.navigate(['/login']),
      () => {
        this.loading = false;
        this.userExists = true;
      }
    );
  }
}
