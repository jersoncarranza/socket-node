import { Usuario } from "./usuario";
import { throws } from "assert";

export class UsuariosLista {
    private lista: Usuario[] = [];

    constructor(){}

    // Agregar un usuario
    public agregar(usuario: Usuario){
        this.lista.push(usuario);

        return usuario;
    }

    public actualizarNombre(id:string, nombre: string){
        for(let usuario of this.lista){
            if(usuario.id === id){
                usuario.nombre = nombre;
                break;
            }   
        }
        console.log('=== ACtualizando usuario ===');
        console.log(this.lista);
    }
    //Obtener lista de usuarios
    public getLista(){
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }

    public getUsuario(id: string){
        return this.lista.find(usuario =>   usuario.id === id);
    }
    //Obtenr usuario en una sala en particular
    public getUsuariosEnSala(sala: string){
        return this.lista.filter(usuario => { usuario.sala === sala;   });
    }

    public borrarUsuario(id: string){
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tempUsuario;
    }

}