import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { getUserData } from "../helpers/auth.helper";


@Injectable({
    providedIn: 'root'
})
export class UnAuthGuard {


    constructor(
        private router: Router
    ) {}


    /*
        O angular deverá liberar o acesso a rota
        caso não exista um usuário autenticado
    */
   canActivate() {
    if(getUserData() == null) {
        return true;
    }
    else {
        this.router.navigate(['/pages/consulta-produtos']);
        return false;
    }
   }


}


