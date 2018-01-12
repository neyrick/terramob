import { Component, ViewChildren, QueryList } from '@angular/core';
import { BlocRessourceComponent } from './bloc-ressource/bloc-ressource.component';
import { Partie } from './classes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChildren(BlocRessourceComponent) blocsRessources : QueryList<BlocRessourceComponent>;

  partie: Partie = new Partie();

  ngOnInit() {
    if (window.localStorage.getItem("terramob.tour") != null) {
        this.load();
    }
    else {
        this.reset();
    }
  }

  reset(): void {
     this.partie.init();
     this.save();
  }

  passerTour() : void {
     var chaleur = this.partie.etat.energie.qte;
     this.blocsRessources.forEach( bloc => bloc.applyChaleur(chaleur));
     this.blocsRessources.forEach( bloc => bloc.applyProduction(this.partie.etat.nt));
     this.partie.passerTour();
     this.save();
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

  ntPlus() : void {
     this.partie.changerNt(1);
     this.save();
  }

  ntMoins() : void {
     this.partie.changerNt(-1);
     this.save();
  }

  handleChange(event : number) {
     if (event != null) {
        this.partie.changerNt(event);
        this.save();
     }
  }

  save() : void {
     window.localStorage.setItem("terramob.tour", JSON.stringify(this.partie.tour));
     window.localStorage.setItem("terramob.historique", JSON.stringify(this.partie.historique));
     window.localStorage.setItem("terramob.etat", JSON.stringify(this.partie.etat));
     window.localStorage.setItem("terramob.modifie", JSON.stringify(this.partie.modifie));
  }

  load() : void {
     this.partie.tour = JSON.parse(window.localStorage.getItem("terramob.tour"));
     this.partie.historique = JSON.parse(window.localStorage.getItem("terramob.historique"));
     this.partie.etat = JSON.parse(window.localStorage.getItem("terramob.etat"));
     this.partie.modifie = JSON.parse(window.localStorage.getItem("terramob.modifie"));
  }
}
