import { Component, OnInit } from '@angular/core';
import { Emitters } from '../../emitters/emitters';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user!: User;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(({ data }) => {
      this.user = data;
    });
  }

  logout(): void {
    this.userService.logout().subscribe((res) => console.log(res));
  }
}
