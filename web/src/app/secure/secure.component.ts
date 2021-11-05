import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Emitters } from 'src/app/emitters/emitters';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}


  ngOnInit(): void {
    this.userService.user().subscribe(
      (user: any) => {
        Emitters.authEmitter.emit(user);
      },
      () => {
        Emitters.authEmitter.emit(null);
        this.router.navigate(['/register']);
      }
    );
  }

}
