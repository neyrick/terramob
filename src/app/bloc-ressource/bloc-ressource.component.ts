import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { EtatRessource } from '../classes';
import { NumpadComponent } from '../numpad/numpad.component';
import {SignedPipe} from '../signed.pipe';
import { confirmDialog } from '../dialogs';

declare var $:any;

@Component({
  selector: 'app-bloc-ressource',
  templateUrl: './bloc-ressource.component.html',
  styleUrls: ['./bloc-ressource.component.css']
})
export class BlocRessourceComponent {

  @ViewChild(NumpadComponent) numpad;

  @ViewChild('posDelta') posDelta : ElementRef;
  @ViewChild('negDelta') negDelta : ElementRef;

  @Input() ressource: EtatRessource;

  @Input() idRessource: string;

  @Input() themeColor: string;
 
  @Output()  notifyChange: EventEmitter<number> = new EventEmitter();

  @Output()  notifyNT: EventEmitter<number> = new EventEmitter();

  diminuerProduction() : void {
     if ((this.ressource.production > 0) || (this.idRessource == 'mcred')) {
       this.ressource.production--;
       this.notifyChange.emit(0);
     }
  }

  augmenterProduction() : void {
     this.ressource.production++;
     this.notifyChange.emit(0);
  }

  openDialogQte() : void {
     this.numpad.open();
  }

  applyDeltaQte(value : number) : void {
     if (this.applyDelta(value)) {
         $(this.numpad.nativeElement).dialog( "close" );  
         if (value != 0) {
             this.notifyChange.emit(0);
         }
         if (((this.idRessource == 'plante') || (this.idRessource == 'chaleur')) && (value < 0) && ((value % 8) == 0)) {
           var deltaNT : number = value / -8;
           confirmDialog('Augmenter le NT de ' + deltaNT + ' ?', this.themeColor).then((result) => {
             this.notifyNT.emit(deltaNT);
           }).catch((reason) => {});
         }
     }
  }

  applyChaleur(chaleur : number) : void {
     if (chaleur == 0) {
        return;
    }
    if (this.idRessource == 'energie') {
       this.applyDelta(0 - chaleur);
    }
    else if (this.idRessource == 'chaleur') {
       this.applyDelta(chaleur);
    }
  }

  applyProduction(nt : number) : void {
     this.applyDelta(this.ressource.production + (this.idRessource == 'mcred' ? nt : 0));
  }

  applyDelta(deltaValue : number) : boolean {
     if (deltaValue == 0) {
        return true;
    }
    if (deltaValue + this.ressource.qte < 0) {
        window.alert('Pas assez de ressources disponibles !');
        return false;
    }
     this.posDelta.nativeElement.innerHTML = (deltaValue > 0 ? '+ ' + deltaValue : '');
     this.negDelta.nativeElement.innerHTML = (deltaValue < 0 ? deltaValue : '');
     $( '.qteDelta.' + this.idRessource ).removeAttr( "style" ).hide().fadeIn();
     $( '.qteDelta.' + this.idRessource).hide( "drop", { direction: (deltaValue > 0 ? "up": "down") }, "slow" );
     this.ressource.qte += deltaValue;
     return true;
  }

}
