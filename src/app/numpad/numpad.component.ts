import { Component, OnInit, Input, Output, AfterViewInit, EventEmitter, ElementRef } from '@angular/core';
import {SignedPipe} from '../signed.pipe';

@Component({
  selector: 'app-numpad',
  templateUrl: './numpad.component.html',
  styleUrls: ['./numpad.component.css']
})
export class NumpadComponent implements OnInit, AfterViewInit {

  @Input() title : string;

  @Input() defMultiplier : number = 1;

  @Input() maxDigits : number = 1;

  @Input() showPlus : boolean = false;

  @Input() themeColor : string;

  @Output()  validateEmitter: EventEmitter<number> = new EventEmitter();

  value : number = 0;

  nativeElement : ElementRef;

  constructor(el: ElementRef) {
    this.nativeElement = el.nativeElement;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $(this.nativeElement).dialog({
      autoOpen: false,
      modal: true,
      width: '450px',
      show: { effect: "drop", duration: 400, direction : 'up' },
      hide: { effect: "drop", duration: 400, direction : 'up' },
      classes: { "ui-dialog" : "noTitle genDialog " + this.themeColor},
    });
  }

  open(newvalue : number = 0) : void {
     this.value = newvalue;
     $(this.nativeElement).dialog( "open" );
  }

  close() : void {
     $(this.nativeElement).dialog( "close" );
  }

  reverseValue() : void {
        this.value = 0 - this.value;
  }

  clearValue() : void {
        this.value = 0;
  }


  addValue(key : number) : void { 
    if (this.value == 0) {
       this.value = this.defMultiplier * key;
       return;
    }
    
    var sign : number = (this.value > 0 ? 1 : -1);
    var length = (this.value * sign).toString().length;
    if (length < this.maxDigits) {
      this.value = this.value * 10 + key * sign;
    }
  }

  validateValue() : void {
     this.validateEmitter.emit(this.value);
  }
}
