import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  infoForm!: FormGroup;
  passwordForm!: FormGroup;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private userService: UserService
  ) {
    this.router.params.subscribe(
      () => {
        this.infoForm = this.formBuilder.group({
          name: '',
          phone: '',
          address: '',
          gender: '',
          email: '',
          password: '',
        });
    
        this.passwordForm = this.formBuilder.group({
          password: '',
          password_confirm: '',
        });
    
        Emitters.authEmitter.subscribe(({ data }) => {
          console.log(data);
          this.user = data;
          this.infoForm.patchValue(data);
        });
      });
  }

  ngOnInit(): void {
    this.router.params.subscribe(
      () => {
        this.infoForm = this.formBuilder.group({
          name: '',
          phone: '',
          address: '',
          gender: '',
          email: '',
          password: '',
        });
    
        this.passwordForm = this.formBuilder.group({
          password: '',
          password_confirm: '',
        });
    
        Emitters.authEmitter.subscribe(({ data }) => {
          console.log(data);
          this.user = data;
          this.infoForm.patchValue(data);
        });
      });
  }

  infoSubmit(): void {
    // this.userService
    //   .updateInfo(this.infoForm.getRawValue())
    //   .subscribe((user) => Emitters.authEmitter.emit(user));
  }

  passwordSubmit(): void {
    // this.userService
    //   .updatePassword(this.passwordForm.getRawValue())
    //   .subscribe((user) => console.log(user));
  }
}
