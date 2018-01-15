import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BlocRessourceComponent } from './bloc-ressource/bloc-ressource.component';

import * as $ from 'jquery';
import { SignedPipe } from './signed.pipe';
import { EndgameDialogComponent } from './endgame-dialog/endgame-dialog.component';
import { NumpadComponent } from './numpad/numpad.component';

@NgModule({
  declarations: [
    AppComponent,
    BlocRessourceComponent,
    SignedPipe,
    EndgameDialogComponent,
    NumpadComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
