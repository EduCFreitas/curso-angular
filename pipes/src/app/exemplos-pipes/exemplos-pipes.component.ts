import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

  livro: any = {
    titulo: 'Guerra dos Reinos',
    rating: 4.54321,
    numeroPaginas: 100,
    preco: 49.99,
    dataLancamento: new Date(2019, 9, 21),
    url: 'http://google.com'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
