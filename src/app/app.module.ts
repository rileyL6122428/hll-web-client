import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ImagesModule } from './shared/images/images.module';
import { SiteLogoComponent } from './shared/site-logo/site-logo.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImagesModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    SiteLogoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
