import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCEP(cep: string){
    //console.log(cep);

    //Torna cep apenas com dígitos
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado
    if(cep!=""){
      //Expressão regular para validação de CEP
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP
      if(validacep.test(cep)){
        //Consulta o webservice viacep.com.br/
        return this.http.get(`https://viacep.com.br/ws/${cep}/json`);
      }
    }

    return of({});
  }
}
