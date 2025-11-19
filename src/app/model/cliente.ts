import { EnderecoCliente } from './enderecocliente';

export class Cliente {
  id!: number;
  nome!: string;
  cpfCnpj!: string;
  email!: string;
  telefone!: string;
  endereco!: EnderecoCliente;
}
