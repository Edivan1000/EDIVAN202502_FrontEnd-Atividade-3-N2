// Cliente.ts
// Certifique-se de que a importação de Orcamento está REMOVIDA
// Certifique-se de que a importação de ClienteConfig está REMOVIDA
// import { ClienteConfig } from './ClienteConfig'; // REMOVER ESTA LINHA
// import { Orcamento } from './Orcamento'; // REMOVER ESTA LINHA

export interface Cliente {
  id?: number;
  nome: string;
  email: string;
  telefone?: string;
  
  // orcamentos e config foram removidos, pois foram ignorados no Backend.
}