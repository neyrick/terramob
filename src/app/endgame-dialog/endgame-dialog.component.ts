import { Component, OnInit, Input, Output, ElementRef, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { NumpadComponent } from '../numpad/numpad.component';

import { EtatTour, Scores } from '../classes';

@Component({
  selector: 'app-endgame-dialog',
  templateUrl: './endgame-dialog.component.html',
  styleUrls: ['./endgame-dialog.component.css']
})
export class EndgameDialogComponent implements OnInit {

  @ViewChild(NumpadComponent) numpad;

  @Input() etat : EtatTour;

  @Input() scores : Scores;

  @Output() restartEmitter: EventEmitter<string> = new EventEmitter();

  nativeElement : ElementRef;

  total : number = 0;

  currentField : string;

  constructor(el: ElementRef) {
    this.nativeElement = el.nativeElement;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(this.nativeElement).dialog({
      autoOpen: false,
      modal: true,
      show: { effect: "drop", duration: 400, direction : 'up' },
      hide: { effect: "drop", duration: 400, direction : 'up' },
      classes: { "ui-dialog" : "noTitle" },
      width: 'auto',
    });
  }

  recommencer() : void {
    if (window.confirm('On efface tout et on recommence ?')) {
      $(this.nativeElement).dialog("close");
      this.restartEmitter.emit('go');
    }
  }

  setScore(field : string) : void {
    this.currentField = field;
    this.numpad.open();
  }

  applyScore(value : number) : void {
    switch(this.currentField) {
      case 'objectifs': this.scores.objectifs = value; break;
      case 'recompenses': this.scores.recompenses = value; break;
      case 'forets': this.scores.forets = value; break;
      case 'cites': this.scores.cites = value; break;
      case 'cartes': this.scores.cartes = value; break;
    }
    this.calculer();
    this.numpad.close();
  }

  calculer() {
    this.total = this.etat.nt + this.scores.objectifs + this.scores.recompenses + this.scores.forets + this.scores.cites + this.scores.cartes;
  }

}
