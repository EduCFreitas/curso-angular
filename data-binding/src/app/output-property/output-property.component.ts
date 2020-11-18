import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'contador',
  templateUrl: './output-property.component.html',
  styleUrls: ['./output-property.component.css'],
  //outputs: ['mudouValor']
})
export class OutputPropertyComponent implements OnInit {

  @Input() valor: any = 0;

  @Output() mudouValor = new EventEmitter();

  //@ViewChild('campoInput') campoValorInput: ElementRef;
  @ViewChild('campoInput') campoValorInput: any;

  incrementa(){
    console.log(this.campoValorInput)
    //this.valor++;
    this.campoValorInput.nativeElement.value++;
    this.valor = this.campoValorInput.nativeElement.value;
    this.mudouValor.emit({novoValor: this.valor});
  }

  decrementa(){
    //this.valor--;
    this.campoValorInput.nativeElement.value--;
    this.valor = this.campoValorInput.nativeElement.value;
    this.mudouValor.emit({novoValor: this.valor});
  }

  constructor() { }

  ngOnInit(): void {
  }

}
