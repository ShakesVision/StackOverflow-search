import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailComponent } from './pages/detail/detail.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { RouteReuseService } from './services/RouteReuseService';


@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: RouteReuseService
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
