import { Cliente } from './cliente';

export class EnderecoCliente {
  id!: number;
  logradouro!: string;
  numero!: string;
  bairro!: string;
  cidade!: string;
  estado!: string;
  cep!: string;
  cliente!: Cliente; //Endereço está associado a um cliente
}
