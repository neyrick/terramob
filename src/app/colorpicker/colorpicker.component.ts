import { Component, OnInit, AfterViewInit, Output, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-colorpicker',
  templateUrl: './colorpicker.component.html',
  styleUrls: ['./colorpicker.component.css']
})
export class ColorpickerComponent implements OnInit {

  @Output() colorEmitter: EventEmitter<string> = new EventEmitter();

  selectedColor : string;

  colorList=[ 'theme-rouge', 'theme-bleu', 'theme-vert' ];

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
      show: { effect: "drop", duration: 400, direction : 'up' },
      hide: { effect: "drop", duration: 400, direction : 'up' },
      classes: { "ui-dialog" : "noTitle genDialog" },
      width: '500',
    });
  }


  open(color: string) : void {
    this.selectedColor = color;
     $(this.nativeElement).dialog( "open" );
  }

  close() : void {
     $(this.nativeElement).dialog( "close" );
  }

  selectColor(color: string) : void {
     this.colorEmitter.emit(color);
  }

}
