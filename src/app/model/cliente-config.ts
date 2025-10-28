// Removida a importação de Cliente, pois a referência bidirecional não deve estar aqui.

/**
 * Interface que representa a configuração do cliente.
 * Alinhada com as correções de serialização do Backend (removida a referência 'cliente').
 */
export interface ClienteConfig {
  id?: number;
  preferenciaContato?: string;
  observacoes?: string;
  
  // O relacionamento com Cliente (cliente) foi ignorado no Backend e deve ser omitido aqui.
}