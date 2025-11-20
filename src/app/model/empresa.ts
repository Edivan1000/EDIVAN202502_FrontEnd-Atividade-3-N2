import { EnderecoEmpresa } from './enderecoempresa';

export class Empresa {
  id!: number;
  razaoSocial!: string;
  nomeFantasia!: string;
  cnpj!: string;
  email!: string;
  telefone!: string;
  endereco!: EnderecoEmpresa; //Empresa tem um endereço
}
