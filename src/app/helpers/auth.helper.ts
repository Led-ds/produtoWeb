import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';

/*
    Função para gravar os dados do usuário
*/    
export function signIn(data: any): void{
    const content = CryptoJS.AES.encrypt(JSON.stringify(data), environment.keyCryto).toString();

    localStorage.setItem(environment.userAuth, content);
}

/*
    Função para ler os dados gravados na local storage
*/
export function getUserData(): any {
    const content = localStorage.getItem(environment.userAuth);

    if(content !=null){
        const data = CryptoJS.AES.decrypt(content, environment.keyCryto).toString(CryptoJS.enc.Utf8);
        return JSON.parse(data);
    }

    return null;
}

/*
    Função para apagar os dados gravados na local storage
*/
export function signOut(): void{
    localStorage.removeItem(environment.userAuth);
}
