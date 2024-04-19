import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-produtos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css'
})
export class CadastroProdutosComponent implements OnInit{

  fornecedores: any[] = [];
  mensagem: string = '';

  constructor(private httpClient: HttpClient){ }

  //criando um objeto para capturar o formulário
  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    preco: new FormControl('', [Validators.required, Validators.min(1)]),
    quantidade: new FormControl('', [Validators.required, Validators.min(0)]),
    fornecedorId: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {    
    this.httpClient.get(`${environment.apiProdutos}/fornecedores`).subscribe({
        next: (data) => {
          this.fornecedores = data as any[];
        },

        error: (e) => {
          throw new Error(e.error);
        }
    });

  }

  //evento executado ao clicarmos no SUBMIT do formulário
  onSubmit(): void {
    this.httpClient.post(`${environment.apiProdutos}/produtos`,
      this.form.value, { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.mensagem = data;

          this.form.reset();//clear form
        },
        error: (e) => {
          throw new Error(e.error);
        }
      });
  }


  

}
