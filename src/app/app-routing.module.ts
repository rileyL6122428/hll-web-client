import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  { path: 'profile', pathMatch: 'full', component: ProfileComponent },
  { path: 'access_token', pathMatch: 'prefix', component: ProfileComponent },
  { path: 'access_token', pathMatch: 'full', component: ProfileComponent },
  // { path: '', component: ProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'error-404', component: Error404Component },
  { path: '**', redirectTo: 'error-404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
