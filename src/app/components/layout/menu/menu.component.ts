import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getUserData, signOut } from '../../../helpers/auth.helper';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {


  //atributos (variáveis)
  isAuthenticated: boolean = false;
  nomeUsuario: string = '';


  //método executando quando o componente abre
  ngOnInit(): void {
    //capturar os dados do usuário autenticado
    const data = getUserData();
    //verificar se algo foi obtido
    if(data != null) {
      this.isAuthenticated = true;
      this.nomeUsuario = data.nome;
    }
  }


  //método para fazer o logout do usuário
  logout(): void {
    if(confirm('Deseja realmente sair do sistema?')) {      
      signOut(); //apagar os dados do usuário autenticado
      location.href = '/pages/autenticar-usuario'; //redirecionamento
    }
  }


}

