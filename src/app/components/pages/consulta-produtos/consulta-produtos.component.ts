import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-consulta-produtos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './consulta-produtos.component.html',
  styleUrl: './consulta-produtos.component.css'
})
export class ConsultaProdutosComponent implements OnInit {

  //atributos
  produtos: any[] = [];
  mensagem: string = '';

  //método construtor
  constructor(private httpClient: HttpClient){ }

  //função executado no momento em que a página é aberta
  ngOnInit(): void {
    //fazendo uma requisição para o serviço de consulta de produtos da API
    this.httpClient.get(`${environment.apiProdutos}/produtos`)
      .subscribe(
        {
          next: (data) => {
            //armazenar os dados obtidos da API
            this.produtos = data as any[];
          },
          error: (e) => {
            throw new Error(e.error);
          }
        }
      );
  }
  
  onDelete(id: number): void{    
    if(confirm("Deseja realemente excluir o produto selecionado?")) {
      this.httpClient.delete(`${environment.apiProdutos}/produtos/${id}`, {responseType: 'text'}).subscribe({
        next: (data) => {
          this.mensagem = data;
          this.ngOnInit();
        },
        error: (e) =>{
          throw new Error(e.error);
        }
      });   
    }

  }
  
}
