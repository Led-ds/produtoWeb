import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {

  mensagem: string = '';

  erros: any[] = [];

  constructor(private httpClient: HttpClient){}

  //estrutura do formulário
  form = new FormGroup({
    nome: new FormControl('', [
      Validators.required, Validators.minLength(8), Validators.maxLength(100)
    ]),
    email: new FormControl('', [
      Validators.required, Validators.email
    ]),
    senha: new FormControl('', [
      Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ])
  });


  //função para verificar se cada campo do formulário está com erro
  get f(): any {
    return this.form.controls;
  }


  //função para capturar o SUBMIT do formulário
  onSubmit(): void {

    this.mensagem = '';
    this.erros = [];

    this.httpClient.post(`${environment.apiUsuarios}/usuarios/criar`,
    this.form.value)
    .subscribe({
      next: (data: any) => {
        this.mensagem = `Parabéns ${data.nome}, sua conta de usuário foi criada com sucesso.`;
        this.form.reset();
      },
      error: (e) => {
        this.erros = e.error;
      }
    });
  }


}
