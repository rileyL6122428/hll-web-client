import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { NewTrackComponent } from './new-track/new-track.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthModule } from './shared/auth/auth.module';
import { HllHttpClientsModule } from './shared/http-clients/http-clients.module';
import { ImagesModule } from './shared/images/images.module';
import { SiteLogoComponent } from './shared/site-logo/site-logo.component';
import { TrackPlayerComponent } from './shared/track-player/track-player.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ImagesModule,
    AuthModule,
    BrowserAnimationsModule,
    FormsModule,
    HllHttpClientsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    SiteLogoComponent,
    TrackPlayerComponent,
    Error404Component,
    Error403Component,
    NewTrackComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
