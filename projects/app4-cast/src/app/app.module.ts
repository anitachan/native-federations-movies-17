import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';

import { SharedLibModule } from 'shared-lib';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CastComponent } from './ui/components/cast/cast.component';

@NgModule({
  declarations: [AppComponent, CastComponent],
  imports: [BrowserModule, AppRoutingModule, SharedLibModule, MatCardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
