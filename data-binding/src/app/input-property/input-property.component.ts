import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-curso',
  templateUrl: './input-property.component.html',
  styleUrls: ['./input-property.component.css'],
  //Outra forma de importar variável do template:
  //inputs: ['nomeCurso:nome']
})
export class InputPropertyComponent implements OnInit {

  //'nome' no @Input apenas pelo atributo passado pelo template ser diferente do nome da variável no component local
  @Input('nome') nomeCurso: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
