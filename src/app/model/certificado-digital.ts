// Removida a importação de Orcamento, pois não é mais referenciado diretamente.
import { Empresa } from './empresa';

/**
 * Interface que representa a entidade CertificadoDigital (Detalhe).
 * Alinhada com as correções de serialização do Backend (removido o relacionamento bidirecional 'orcamento').
 */
export interface CertificadoDigital {
  id?: number;
  
  // O relacionamento com Orcamento (Mestre) é gerenciado pelo Backend e não deve ser enviado/recebido
  // para evitar loops e simplificar o payload. O campo 'orcamento' foi REMOVIDO daqui.
  
  nomeProduto: string; // Copiado de ProdutoCatalogo
  tipoPublico: string; // 'PF' ou 'PJ'
  validadeMeses: number;
  preco: number;
  dataValidade?: Date; // Calculada no Backend
  ativo: boolean; // O "botão de envio"
  
  // Relacionamento N:1 Opcional
  empresa?: Empresa; // Opcional, se tipoPublico for 'PJ'
}