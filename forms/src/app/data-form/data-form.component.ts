import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { empty, Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { FormValidations } from '../shared/form-validations';
import { VerificaEmailService } from './services/verifica-email.service';
import { BaseFormComponent } from '../shared/base-form/base-form.component';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  //formulario: FormGroup;
  //estados: EstadoBr[];
  estados: Observable<EstadoBr[]>;
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];
  frameworks: any[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
    ) {
    super();
  }

  ngOnInit(): void {
    // this.dropdownService.getEstadosBr().subscribe(dados => {
    //   this.estados = dados;
    //   console.log(dados);
    // });

    //this.verificaEmailService.verificarEmail('email@email.com').subscribe();

    this.estados = this.dropdownService.getEstadosBr();
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletterOp = this.dropdownService.getNewsletter();
    this.frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),
    //   endereco: new FormGroup({
    //     cep: new FormControl(null)
    //   })
    // });

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });

    this.formulario.get('endereco.cep').statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status CEP: ', value)),
        switchMap(status => status === 'VALID' ? this.cepService.consultaCEP(this.formulario.get('endereco.cep').value) : empty())
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});
  }

  buildFrameworks(){
    const values = this.frameworks.map(v => new FormControl(false));

    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));
    // this.formBuilder.array([
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false)
    // ]);
  }

  submit() {
    console.log(this.formulario.value);

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks.map((v, i) => v ? this.frameworks[i] : null).filter(v => v !== null)
    });

    console.log(valueSubmit);

    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
        .subscribe(dados => {
          console.log(dados);
          //Reseta formulário
          this.resetar();
          }, (error: any) => alert('erro')
        );
  }

  consultaCEP(){
    let cep = this.formulario.get('endereco.cep').value;
    //console.log(cep);

    if(cep != null && cep !== ''){
      this.cepService.consultaCEP(cep).subscribe(dados => this.populaDadosForm(dados));
    }

  }

  populaDadosForm(dados){
    //this.formulario.get('nome').setValue('Eduardo');

    this.formulario.patchValue({
      endereco: {
        //cep: dados.cep,
        rua: dados.logradouro,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    //console.log(formulario);
  }

  resetaDadosForm(){
    this.formulario.patchValue({
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

  setarCargo(){
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obj1, obj2){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologias(){
    this.formulario.get('tecnologias').setValue(['java', 'javascript', 'php']);
  }

  validarEmail(formControl: FormControl){
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? {emailInvalido: true} : null));
  }

}
