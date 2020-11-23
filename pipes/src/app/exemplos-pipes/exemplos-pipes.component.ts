import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  livros: string[] = ['Java', 'Angular 2'];

  filtro: string;

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Valor assíncrono'), 2000)
  });

  valorAsync2 = interval(2000).pipe(
    map(valor => 'Valor assíncrono 2')
  )

  constructor() { }

  ngOnInit(): void {
  }

  addCurso(valor){
    this.livros.push(valor);
    console.log(this.livros);
  }

  obterCursos(){
    if(this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === ''){
      return this.livros;
    }

    return this.livros.filter((v) => {
      if(v.toLowerCase().indexOf(this.filtro.toLowerCase()) >=0){
        return true;
      }
      return false;
    });
  }

}
