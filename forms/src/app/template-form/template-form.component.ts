import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit(formulario){
    console.log(formulario);
    //console.log(this.usuario);

    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
      .subscribe(dados => {
        console.log(dados);
        formulario.form.reset();
      });
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

  consultaCEP(cep, form){
    //console.log(cep);

    //Torna cep apenas com dígitos
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado
    if(cep!=""){
      //Expressão regular para validação de CEP
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP
      if(validacep.test(cep)){
        this.resetaDadosForm(form);

        //Consulta o webservice viacep.com.br/
        this.http.get(`https://viacep.com.br/ws/${cep}/json`).subscribe(dados => this.populaDadosForm(dados, form));
      }
    }
  }

  populaDadosForm(dados, formulario){
    // formulario.setValue({
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   endereco: {
    //     cep: dados.cep,
    //     rua: dados.logradouro,
    //     numero: formulario.value.numero,
    //     complemento: dados.complemento,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf
    //   }
    // });

    formulario.form.patchValue({
      endereco: {
        cep: dados.cep,
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    //console.log(formulario);
  }

  resetaDadosForm(formulario){
    formulario.form.patchValue({
      endereco: {
        cep: null,
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

}
