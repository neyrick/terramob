import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { EtatRessource } from '../classes';
import {SignedPipe} from '../signed.pipe';

declare var $:any;

@Component({
  selector: 'app-bloc-ressource',
  templateUrl: './bloc-ressource.component.html',
  styleUrls: ['./bloc-ressource.component.css']
})
export class BlocRessourceComponent implements AfterViewInit {

  @ViewChild('deltaDialog') el:ElementRef;

  @Input() ressource: EtatRessource;

  @Input() idRessource: string;
 
  @Output()  notifyChange: EventEmitter<number> = new EventEmitter();

  deltaValue : number = 0;

  constructor() { }

  ngAfterViewInit() {
    $(this.el.nativeElement).dialog({
      autoOpen: false,
      modal: true,
      show: { effect: "drop", duration: 400, direction : 'up' },
      hide: { effect: "drop", duration: 400, direction : 'up' },
    });
  }

  openDialogProduction() : void {
     this.ressource.production++;
     this.notifyChange.emit(0);
  }

  openDialogQte() : void {
     this.deltaValue = 0;
     $(this.el.nativeElement).dialog( "open" );
  }

  closeDialogQte() : void {
     $(this.el.nativeElement).dialog( "close" );  
      this.applyDelta();   
     if (this.deltaValue != 0) {
         this.notifyChange.emit(0);
     }
  }

  reverseDeltaValue() : void {
        this.deltaValue = 0 - this.deltaValue;
  }

  clearDeltaValue() : void {
        this.deltaValue = 0;
  }

  addDelta(value : number) : void {
    if (this.deltaValue == 0) {
       this.deltaValue = 0 - value;
    }
    else if (this.deltaValue < 0) {
        if (this.deltaValue > -10) {
            this.deltaValue = this.deltaValue*10 - value;
        }
    }
    else {
        if (this.deltaValue < 10) {
            this.deltaValue = this.deltaValue*10 + value;
        }
    }
  }

  setDelta(value : number) : void {
    this.deltaValue = value;
  } 

  applyChaleur(chaleur : number) : void {
     if (chaleur == 0) {
        return;
    }
    if (this.idRessource == 'energie') {
       this.deltaValue = 0 - chaleur;
       this.applyDelta();
    }
    else if (this.idRessource == 'chaleur') {
       this.deltaValue = chaleur;
     console.log("chaleur avant:" + this.ressource.qte);
       this.applyDelta();
     console.log("chaleur apres:" + this.ressource.qte);
    }
  }

  applyDelta() : void {
     if (this.deltaValue == 0) {
        return;
    }
     $( '.qteDelta.' + this.idRessource ).removeAttr( "style" ).hide().fadeIn();
      $( '.qteDelta.' + this.idRessource).hide( "drop", { direction: (this.deltaValue > 0 ? "up": "down") }, "slow", function() { this.deltaValue = 0;});
        this.ressource.qte += this.deltaValue;
  }

  applyProduction(nt : number) : void {
     this.deltaValue = this.ressource.production;
     if (this.idRessource == 'mcred') {
         this.deltaValue += nt;
     }
     this.applyDelta();
  }
}
