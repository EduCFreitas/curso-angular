import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: 'Eduardo',
    email: 'edu@email.com'
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(form){
    console.log(form);
    //console.log(this.usuario);
  }

  verificaValidTouched(campo){
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo){
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    };
  }

  consultaCEP(cep){
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
        this.http.get(`https://viacep.com.br/ws/${cep}/json`).subscribe(dados => console.log(dados));
      }
    }
  }

}
