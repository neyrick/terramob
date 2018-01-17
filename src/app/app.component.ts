import { Component, ViewChild, ViewChildren, QueryList, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { BlocRessourceComponent } from './bloc-ressource/bloc-ressource.component';
import { EndgameDialogComponent } from './endgame-dialog/endgame-dialog.component';
import { ColorpickerComponent } from './colorpicker/colorpicker.component';
import { Partie } from './classes';
import { confirmDialog } from './dialogs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('cardsDialog') cardsDialog:ElementRef;

  @ViewChild(EndgameDialogComponent) endGameDialog;

  @ViewChild(ColorpickerComponent) colorPicker;

  @ViewChildren(BlocRessourceComponent) blocsRessources : QueryList<BlocRessourceComponent>;

  partie: Partie = new Partie();

  themeColor : string = 'theme-vert';

  ngOnInit() {
    $(this.cardsDialog.nativeElement).dialog({
      autoOpen: false,
      modal: true,
      classes: { "ui-dialog" : "noTitle genDialog " + this.themeColor},    
      show: { effect: "drop", duration: 400, direction : 'up' },
      hide: { effect: "drop", duration: 400, direction : 'up' },
    });
    if (window.localStorage.getItem("terramob.tour") != null) {
        this.load();
    }
    else {
        this.reset();
    }

  }

  ngAfterViewInit() : void {
    if (this.partie.terminee) {
        $(this.endGameDialog.nativeElement).dialog("open");
    }
  }

  reset(): void {
     this.partie.init();
     this.save();
  }

  phaseProduction() : void {
         var chaleur = this.partie.etat.energie.qte;
         this.blocsRessources.forEach( bloc => bloc.applyChaleur(chaleur));
         this.blocsRessources.forEach( bloc => bloc.applyProduction(this.partie.etat.nt));
  }
 
  passerTour() : void {
     confirmDialog('Passer au tour suivant ?', this.themeColor).then((result) => {
         this.phaseProduction();
         this.partie.passerTour();
         this.save();
          $(this.cardsDialog.nativeElement).dialog("open");
     }).catch((reason) => {});
  }

  afficherProductions() : void {
      setTimeout(function() {
        $( "#effect" ).removeAttr( "style" ).hide().fadeIn();
      }, 1000 );
//         this.partie.passerTour();
         this.save();
  };

  rewind() {
     this.partie.rewind();
     this.save();
  }

  finPartie(): void {
     confirmDialog('Lancer une dernière production et afficher le calcul du score final ?', this.themeColor).then((result) => {
       this.phaseProduction();
       this.partie.terminer();
       this.save();
       $(this.endGameDialog.nativeElement).dialog("open");
     }).catch((reason) => {});
  }

  ntPlus() : void {
     this.partie.changerNt(1);
     this.save();
  }

  ntMoins() : void {
     this.partie.changerNt(-1);
     this.save();
  }

  changerNT(value : number) : void {
        this.partie.changerNt(value);
  }

  handleChange(event : number) {
     if (event != null) {
        this.save();
     }
  }
onfir
  save() : void {
     window.localStorage.setItem("terramob.tour", JSON.stringify(this.partie.tour));
     window.localStorage.setItem("terramob.historique", JSON.stringify(this.partie.historique));
     window.localStorage.setItem("terramob.etat", JSON.stringify(this.partie.etat));
     window.localStorage.setItem("terramob.modifie", JSON.stringify(this.partie.modifie));
     window.localStorage.setItem("terramob.terminee", JSON.stringify(this.partie.terminee));
     window.localStorage.setItem("terramob.scores", JSON.stringify(this.partie.scores));
  }

  load() : void {
     this.partie.tour = JSON.parse(window.localStorage.getItem("terramob.tour"));
     this.partie.historique = JSON.parse(window.localStorage.getItem("terramob.historique"));
     this.partie.etat = JSON.parse(window.localStorage.getItem("terramob.etat"));
     this.partie.modifie = JSON.parse(window.localStorage.getItem("terramob.modifie"));
     this.partie.terminee = JSON.parse(window.localStorage.getItem("terramob.terminee"));
     this.partie.scores = JSON.parse(window.localStorage.getItem("terramob.scores"));
  }

  confirmCard(nbCards : number) : void {
    confirmDialog("Acheter " + nbCards + " carte(s) ?", this.themeColor).then((result) => {
      if (nbCards > 0) {
          this.blocsRessources.forEach( bloc => { if (bloc.idRessource == 'mcred') {
             if (bloc.applyDelta(-3*nbCards)) {
                  $(this.cardsDialog.nativeElement).dialog("close");
                 this.save();
             };
         } });
      }
     }).catch((reason) => {});
  }

  openColorPicker() {
    this.colorPicker.open(this.themeColor);
  }

  setColor(color) {
    this.themeColor = color;
  }
}
