import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { RegisterComponent } from './public/register/register.component';
import { HomeComponent } from './secure/home/home.component';
import { ProfileComponent } from './secure/profile/profile.component';
import { SecureComponent } from './secure/secure.component';

const routes: Routes = [
  {
    path: '',
    component: SecureComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
  ],
  },
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
