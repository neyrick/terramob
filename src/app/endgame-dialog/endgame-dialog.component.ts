import { Component, OnInit, Input, Output, ElementRef, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { NumpadComponent } from '../numpad/numpad.component';

import { EtatTour, Scores } from '../classes';

import { confirmDialog } from '../dialogs';

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

  @Output() saveEmitter: EventEmitter<string> = new EventEmitter();

  @Input() themeColor : string;

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
      classes: { "ui-dialog" : "noTitle genDialog" },
      width: '550',
    });
  }

  recommencer() : void {
    confirmDialog('On efface tout et on recommence ?', this.themeColor).then((result) => {
      $(this.nativeElement).dialog("close");
      this.restartEmitter.emit('go');
     }).catch((reason) => {});
  }

  setScore(field : string) : void {
    this.currentField = field;
    switch(this.currentField) {
      case 'objectifs': this.numpad.open(this.scores.objectifs);
      case 'recompenses': this.numpad.open(this.scores.recompenses);
      case 'forets': this.numpad.open(this.scores.forets);
      case 'cites': this.numpad.open(this.scores.cites);
      case 'cartes': this.numpad.open(this.scores.cartes);
    }
  }

  applyScore(value : number) : void {
    switch(this.currentField) {
      case 'objectifs': this.scores.objectifs = value; break;
      case 'recompenses': this.scores.recompenses = value; break;
      case 'forets': this.scores.forets = value; break;
      case 'cites': this.scores.cites = value; break;
      case 'cartes': this.scores.cartes = value; break;
    }
    this.saveEmitter.emit('go');
    this.calculer();
    this.numpad.close();
  }

  calculer() {
    this.total = this.etat.nt + this.scores.objectifs + this.scores.recompenses + this.scores.forets + this.scores.cites + this.scores.cartes;
  }

}
