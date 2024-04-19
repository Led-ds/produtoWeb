import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-consulta-fornecedores',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './consulta-fornecedores.component.html',
  styleUrl: './consulta-fornecedores.component.css'
})
export class ConsultaFornecedoresComponent implements OnInit {

  //atributos
  fornecedores: any[] = []; //array de objetos

  //método construtor
  constructor(private httpClient: HttpClient) { }

  //função executada quando o componente é aberto
  ngOnInit(): void {
    
    //fazendo uma requisição GET para a API
    this.httpClient.get(`${environment.apiProdutos}/fornecedores`)
      .subscribe( //capturando o retorno da chamada da API
        {
          //capturar o retorno de sucesso da API
          next: (data) => { 
            //armazenar os dados obtidos da API no atributo da classe
            this.fornecedores = data as any[];
          },
          //capturar o retorno de erro da API
          error: (e) => {
            console.log(e.error);
          }
        }
      );
  }
}
