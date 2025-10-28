import { Cliente } from './cliente';
import { CertificadoDigital } from './certificado-digital';

/**
 * Interface que representa a entidade Orcamento (Mestre).
 */
export interface Orcamento {
  // Campos Gerados pelo Backend
  id?: number;
  dataSolicitacao?: Date;
  
  // Campos de Relacionamento
  cliente: Cliente; // O cliente (deve ter o ID preenchido após o primeiro POST)
  
  // Campos de Dados
  status: string; // Ex: 'RASCUNHO', 'ENVIADO', 'APROVADO'
  
  // Detalhe: Array de Certificados Digitais
  itens: CertificadoDigital[]; 
}