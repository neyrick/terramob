export class EtatRessource {
  qte: number;
  production: number;
}

export class EtatTour {
  nt: number;
  mcred: EtatRessource;
  acier: EtatRessource;
  titane: EtatRessource;
  plante: EtatRessource;
  energie: EtatRessource;
  chaleur: EtatRessource;
}

export class Partie {
  tour: number;
  historique: EtatTour[];
  etat: EtatTour;
  modifie: boolean;

  init(): void {
     this.tour = 1;
     this.historique = [];
     this.etat = { nt: 0, mcred: { qte: 0, production: 0}, acier: { qte: 0, production: 0}, titane: { qte: 0, production: 0}, plante: { qte: 0, production: 0}, energie: { qte: 0, production: 0}, chaleur: { qte: 0, production: 0}};
     this.enregistrerTour();
  }

  passerTour(): void {
     this.etat.chaleur.qte += this.etat.energie.qte;
     this.etat.energie.qte = 0;
     this.etat.mcred.qte += this.etat.nt;
 
     this.etat.mcred.qte += this.etat.mcred.production;
     this.etat.acier.qte += this.etat.acier.production;
     this.etat.titane.qte += this.etat.titane.production;
     this.etat.plante.qte += this.etat.plante.production;
     this.etat.energie.qte += this.etat.energie.production;
     this.etat.chaleur.qte += this.etat.chaleur.production;

     this.tour++;
     this.enregistrerTour();
  }

  enregistrerTour() : void {
     this.modifie = false;
     this.historique.unshift(JSON.parse(JSON.stringify(this.etat)));
  }

  chargerTour(tour: EtatTour) : void {
     this.etat = JSON.parse(JSON.stringify(this.etat));
  }

  rewind() : void {
    if ((this.tour == 1) || (this.modifie)) {
       this.chargerTour(this.historique[0]);
    }
    else {
       this.tour--;
       this.chargerTour(this.historique.shift());
    }
  }

  changerNt(delta: number) {
     this.etat.nt += delta;
     this.modifie = true;
  }
}


