import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { getUserData } from "../helpers/auth.helper";


@Injectable({
    providedIn: 'root'
})
export class AuthGuard {


    //método construtor
    constructor(
        private router: Router
    ) {}


    /*
        Método para verificar se o usuário
        está autenticado no sistema
    */
   canActivate() {        
        //verificando se existe um usuário
        if(getUserData() != null) {
            return true;
        }
        else {
            //redirecionar para a página de autenticação
            this.router.navigate(['/pages/autenticar-usuario']);
            return false;
        }
   }
}

