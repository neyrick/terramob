import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EtatTour } from '../classes';

@Component({
  selector: 'app-tabressources',
  templateUrl: './tabressources.component.html',
  styleUrls: ['./tabressources.component.css']
})
export class TabressourcesComponent implements OnInit {

  @Input() etat: EtatTour[];

  @Output()  notifyChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
