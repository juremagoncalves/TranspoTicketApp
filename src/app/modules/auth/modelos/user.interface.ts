import { Person } from "./person.interface";
import { Role } from "./role.interface";

export interface User{
    // pkUsuario: string;
    // email: string;
    // password?: string;
    // fkPessoa: Person;
    // roles: Role[];
    // estado: boolean;
    // dataCadastro?: Date;
    person: {
        nome: string;
        bi: string;
        telefone: string;
      };
      user: {
        email: string;
        password: string;
      };
      roleIds: string[]; 

}