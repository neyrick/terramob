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

export class Scores {
  objectifs : number;
  recompenses : number;
  cites : number;
  forets : number;
  cartes : number;
}

export class Partie {
  tour: number;
  historique: EtatTour[] = [];
  etat: EtatTour = { nt: 20, mcred: { qte: 0, production: 0}, acier: { qte: 0, production: 0}, titane: { qte: 0, production: 0}, plante: { qte: 0, production: 0}, energie: { qte: 0, production: 0}, chaleur: { qte: 0, production: 0}};
  modifie: boolean = false;
  terminee : boolean = false;
  scores : Scores = { objectifs : 0, recompenses : 0, cites : 0, forets : 0, cartes : 0};

  init(): void {
     this.tour = 1;
     this.historique = [];
     this.terminee = false;
     this.etat = { nt: 20, mcred: { qte: 0, production: 0}, acier: { qte: 0, production: 0}, titane: { qte: 0, production: 0}, plante: { qte: 0, production: 0}, energie: { qte: 0, production: 0}, chaleur: { qte: 0, production: 0}};
     this.scores = { objectifs : 0, recompenses : 0, cites : 0, forets : 0, cartes : 0};
     this.enregistrerTour();
  }

  passerTour(): void {
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

  terminer() : void {
     this.enregistrerTour();
     this.terminee = true;
  }

  changerNt(delta: number) : void {
     this.etat.nt += delta;
     this.modifie = true;
  }
}


