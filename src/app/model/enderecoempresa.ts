import { Empresa } from './empresa';

export class EnderecoEmpresa {
  id!: number;
  logradouro!: string;
  numero!: string;
  bairro!: string;
  cidade!: string;
  estado!: string;
  cep!: string;
  empresa!: Empresa;
}
