import { Orcamento } from './orcamento';
import { Produto } from './produto';

export class ItensOrcamento {
  codigo?: number;
  quantidade!: number;
  orcamento!: Orcamento;
  produto!: Produto;
}
