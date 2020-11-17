import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = 'http://google.com';
  cursoAngular: boolean = true;
  urlImagem: string = 'https://emtempo.com.br/img/inline/200000/natureza_00203304_0_202005122235.jpg?xid=743954';

  valorAtual: string = ''; 
  valorSalvo: string = '';

  isMouseOver: boolean = false;

  getValor(){
    return 1;
  }

  getCurtirCurso(){
    return true;
  }

  botaoClicado(){
    alert("Botão clicado!");
  }

  onKeyUp(evento: KeyboardEvent){
    this.valorAtual = (<HTMLInputElement>evento.target).value;
  }

  salvarValor(valor: any){
    this.valorSalvo = valor;
  }

  onMouseOverOut(){
    this.isMouseOver = !this.isMouseOver;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
