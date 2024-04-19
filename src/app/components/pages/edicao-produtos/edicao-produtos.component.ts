import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edicao-produtos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],

  templateUrl: './edicao-produtos.component.html',
  styleUrl: './edicao-produtos.component.css'
})
export class EdicaoProdutosComponent implements OnInit {

  fornecedores: any[] = [];
  mensagem: string = '';

  constructor(private httpClient: HttpClient, private activateRoute: ActivatedRoute) { }

  //objeto para capturar o formulario<html>
  form = new FormGroup({
    id: new FormControl(''),

    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    preco: new FormControl('', [Validators.required, Validators.min(1)]),
    quantidade: new FormControl('', [Validators.required, Validators.min(0)]),
    fornecedorId: new FormControl('', [Validators.required]),
  });

  //verifica o estado de cada campo do formulario
  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    //capturar o id passado na URL (rota)
    const id = this.activateRoute.snapshot.paramMap.get('id') as string;

    //buscar produto por id
    this.httpClient.get(`${environment.apiProdutos}/produtos/${id}`).subscribe({

      next: (data: any) => {
        //preencher o formulario
        this.form.controls['id'].setValue(data.id);
        this.form.controls['nome'].setValue(data.nome);
        this.form.controls['preco'].setValue(data.preco);
        this.form.controls['quantidade'].setValue(data.quantidade);
        this.form.controls['fornecedorId'].setValue(data.fornecedor.id);
      },
      error: (e) => {
        throw new Error(e.error);
      }

    });


    this.httpClient.get(`${environment.apiProdutos}/fornecedores`).subscribe({
      next: (data) => {
        this.fornecedores = data as any[];
      },

      error: (e) => {
        throw new Error(e.error);
      }
    });
  }

  onSubmit(): void {
    this.httpClient.put(`${environment.apiProdutos}/produtos`,
      this.form.value, { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.mensagem = data;
        },
        error: (e) => {
          throw new Error(e.error);
        }
      });
  }

}
