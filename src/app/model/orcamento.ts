import { ItensOrcamento } from './itensorcamento';

export class Orcamento {
  codigo?: number;
  dataOrcamento!: string;
  totalOrcamento!: number;
  itens: ItensOrcamento[] = [];//Um Orçamento pode ter vários itens
}
