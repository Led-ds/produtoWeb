import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { signIn } from '../../../helpers/auth.helper';

@Component({
  selector: 'app-autenticar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {

  mensagem: string = '';
  erros: [] = [];

  constructor(private httpClient: HttpClient){}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  get f(): any{
    return this.form.controls;
  }

  onSubmit(): void{
    this.erros = []
    
    this.httpClient.post(`${environment.apiUsuarios}/usuarios/autenticar`,
    this.form.value)
    .subscribe({
      next: (data: any) => {
        signIn(data);
        location.href = 'pages/consulta-produtos';
      },
      error: (e) => {
        this.erros = e.error;
      }
    });
  }

}
