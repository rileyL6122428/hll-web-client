import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ImagesModule } from './shared/images/images.module';
import { SiteLogoComponent } from './shared/site-logo/site-logo.component';
import { PlayTrackComponent } from './shared/play-track/play-track.component';
import { AuthModule } from './shared/auth/auth.module';
import { Error404Component } from './error404/error404.component';
import { Error403Component } from './error403/error403.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImagesModule,
    AuthModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    SiteLogoComponent,
    PlayTrackComponent,
    Error404Component,
    Error403Component
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
