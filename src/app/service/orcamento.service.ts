import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orcamento } from '../model/orcamento';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  private apiUrl = 'http://localhost:8080/api/orcamentos'; 

  constructor(private http: HttpClient) { }

  // POST /api/orcamentos
  // Envia o Mestre (Orcamento) com os Detalhes (CertificadoDigital) aninhados.
  public salvarOrcamentoCompleto(orcamento: Orcamento): Observable<Orcamento> {
    // Note que estamos enviando o objeto ORCAMENTO inteiro!
    return this.http.post<Orcamento>(this.apiUrl, orcamento);
  }

  // GET /api/orcamentos/{id}
  // Consulta um orçamento completo (Mestre e Detalhes)
  public consultarOrcamento(id: number): Observable<Orcamento> {
    return this.http.get<Orcamento>(`${this.apiUrl}/${id}`);
  }
  
  // Opcional: Implementar métodos para Listar Orçamentos

  // Dentro da classe OrcamentoService { ... }

// GET /api/orcamentos
// Lista todos os orçamentos (Mestre)
public listarOrcamentos(): Observable<Orcamento[]> {
  return this.http.get<Orcamento[]>(this.apiUrl);
}
}