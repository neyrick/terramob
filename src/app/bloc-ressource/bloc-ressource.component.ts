import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EtatRessource } from '../classes';

@Component({
  selector: 'app-bloc-ressource',
  templateUrl: './bloc-ressource.component.html',
  styleUrls: ['./bloc-ressource.component.css']
})
export class BlocRessourceComponent implements OnInit {

  @Input() ressource: EtatRessource;

  @Input() idRessource: string;
 
  @Output()  notifyChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  openDialogQte() : void {
     this.ressource.qte++;
     this.notifyChange.emit(0);
  }

  openDialogProduction() : void {
     this.ressource.production++;
     this.notifyChange.emit(0);
  }

}
