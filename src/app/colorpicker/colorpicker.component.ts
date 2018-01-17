import { Component, OnInit, AfterViewInit, Output, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-colorpicker',
  templateUrl: './colorpicker.component.html',
  styleUrls: ['./colorpicker.component.css']
})
export class ColorpickerComponent implements OnInit {

  @Output() colorEmitter: EventEmitter<string> = new EventEmitter();

  selectedColor : string;

  colorList=['theme-000033', 'theme-000066', 'theme-000099', 'theme-0000CC', 'theme-0000FF', 'theme-003300', 'theme-003333', 'theme-003366', 'theme-003399', 'theme-0033CC', 'theme-0033FF', 'theme-006600', 'theme-006633', 'theme-006666', 'theme-006699', 'theme-0066CC', 'theme-0066FF', 'theme-009900', 'theme-009933', 'theme-009966', 'theme-009999', 'theme-0099CC', 'theme-0099FF', 'theme-00CC00', 'theme-00CC33', 'theme-00CC66', 'theme-00CC99', 'theme-00CCCC', 'theme-00CCFF', 'theme-00FF00', 'theme-00FF33', 'theme-00FF66', 'theme-00FF99', 'theme-00FFCC', 'theme-00FFFF', 'theme-330000', 'theme-330033', 'theme-330066', 'theme-330099', 'theme-3300CC', 'theme-3300FF', 'theme-333300', 'theme-333333', 'theme-333366', 'theme-333399', 'theme-3333CC', 'theme-3333FF', 'theme-336600', 'theme-336633', 'theme-336666', 'theme-336699', 'theme-3366CC', 'theme-3366FF', 'theme-339900', 'theme-339933', 'theme-339966', 'theme-339999', 'theme-3399CC', 'theme-3399FF', 'theme-33CC00', 'theme-33CC33', 'theme-33CC66', 'theme-33CC99', 'theme-33CCCC', 'theme-33CCFF', 'theme-33FF00', 'theme-33FF33', 'theme-33FF66', 'theme-33FF99', 'theme-33FFCC', 'theme-33FFFF', 'theme-660000', 'theme-660033', 'theme-660066', 'theme-660099', 'theme-6600CC', 'theme-6600FF', 'theme-663300', 'theme-663333', 'theme-663366', 'theme-663399', 'theme-6633CC', 'theme-6633FF', 'theme-666600', 'theme-666633', 'theme-666666', 'theme-666699', 'theme-6666CC', 'theme-6666FF', 'theme-669900', 'theme-669933', 'theme-669966', 'theme-669999', 'theme-6699CC', 'theme-6699FF', 'theme-66CC00', 'theme-66CC33', 'theme-66CC66', 'theme-66CC99', 'theme-66CCCC', 'theme-66CCFF', 'theme-66FF00', 'theme-66FF33', 'theme-66FF66', 'theme-66FF99', 'theme-66FFCC', 'theme-66FFFF', 'theme-990000', 'theme-990033', 'theme-990066', 'theme-990099', 'theme-9900CC', 'theme-9900FF', 'theme-993300', 'theme-993333', 'theme-993366', 'theme-993399', 'theme-9933CC', 'theme-9933FF', 'theme-996600', 'theme-996633', 'theme-996666', 'theme-996699', 'theme-9966CC', 'theme-9966FF', 'theme-999900', 'theme-999933', 'theme-999966', 'theme-999999', 'theme-9999CC', 'theme-9999FF', 'theme-99CC00', 'theme-99CC33', 'theme-99CC66', 'theme-99CC99', 'theme-99CCCC', 'theme-99CCFF', 'theme-99FF00', 'theme-99FF33', 'theme-99FF66', 'theme-99FF99', 'theme-99FFCC', 'theme-99FFFF', 'theme-CC0000', 'theme-CC0033', 'theme-CC0066', 'theme-CC0099', 'theme-CC00CC', 'theme-CC00FF', 'theme-CC3300', 'theme-CC3333', 'theme-CC3366', 'theme-CC3399', 'theme-CC33CC', 'theme-CC33FF', 'theme-CC6600', 'theme-CC6633', 'theme-CC6666', 'theme-CC6699', 'theme-CC66CC', 'theme-CC66FF', 'theme-CC9900', 'theme-CC9933', 'theme-CC9966', 'theme-CC9999', 'theme-CC99CC', 'theme-CC99FF', 'theme-CCCC00', 'theme-CCCC33', 'theme-CCCC66', 'theme-CCCC99', 'theme-CCCCCC', 'theme-CCCCFF', 'theme-CCFF00', 'theme-CCFF33', 'theme-CCFF66', 'theme-CCFF99', 'theme-CCFFCC', 'theme-CCFFFF', 'theme-FF0000', 'theme-FF0033', 'theme-FF0066', 'theme-FF0099', 'theme-FF00CC', 'theme-FF00FF', 'theme-FF3300', 'theme-FF3333', 'theme-FF3366', 'theme-FF3399', 'theme-FF33CC', 'theme-FF33FF', 'theme-FF6600', 'theme-FF6633', 'theme-FF6666', 'theme-FF6699', 'theme-FF66CC', 'theme-FF66FF', 'theme-FF9900', 'theme-FF9933', 'theme-FF9966', 'theme-FF9999', 'theme-FF99CC', 'theme-FF99FF', 'theme-FFCC00', 'theme-FFCC33', 'theme-FFCC66', 'theme-FFCC99', 'theme-FFCCCC', 'theme-FFCCFF', 'theme-FFFF00', 'theme-FFFF33', 'theme-FFFF66', 'theme-FFFF99', 'theme-FFFFCC', 'theme-FFFFFF'];


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
