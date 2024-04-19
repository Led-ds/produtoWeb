import { Routes } from '@angular/router';
import { ConsultaFornecedoresComponent } from './components/pages/consulta-fornecedores/consulta-fornecedores.component';
import { CadastroProdutosComponent } from './components/pages/cadastro-produtos/cadastro-produtos.component';
import { ConsultaProdutosComponent } from './components/pages/consulta-produtos/consulta-produtos.component';
import { EdicaoProdutosComponent } from './components/pages/edicao-produtos/edicao-produtos.component';
import { AutenticarUsuarioComponent } from './components/pages/autenticar-usuario/autenticar-usuario.component';
import { CriarUsuarioComponent } from './components/pages/criar-usuario/criar-usuario.component';
import { UnAuthGuard } from './guards/unauth.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'pages/consulta-fornecedores', canActivate: [AuthGuard],
        component: ConsultaFornecedoresComponent
    },
    {
        path: 'pages/cadastro-produtos', canActivate: [AuthGuard],
        component: CadastroProdutosComponent
    },
    {
        path: 'pages/consulta-produtos', canActivate: [AuthGuard],
        component: ConsultaProdutosComponent
    },
    {
        path: 'pages/edicao-produtos/:id', canActivate: [AuthGuard],
        component: EdicaoProdutosComponent
    },
    {
        path: 'pages/autenticar-usuario', canActivate: [UnAuthGuard],
        component: AutenticarUsuarioComponent
    },
    {
        path: 'pages/criar-usuario', canActivate: [UnAuthGuard],
        component: CriarUsuarioComponent
    },
    {
        path: '', //URL raiz do projeto
        pathMatch: 'full',
        redirectTo: '/pages/autenticar-usuario'
    },
    {
        path: '**', //URL raiz do projeto
        redirectTo: '/pages/autenticar-usuario'
    }
];
