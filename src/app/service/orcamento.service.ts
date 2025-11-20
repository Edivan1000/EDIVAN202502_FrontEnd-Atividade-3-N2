import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orcamento } from '../model/orcamento';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {
  private apiUrl = 'http://localhost:8080/corcamento'; // URL do seu backend Spring

  constructor(private http: HttpClient) {}
  // Incluir Orçamento
  incluirOrcamento(orcamento: any): Observable<any> {
    return this.http.post(this.apiUrl, orcamento);
  }
  // Listar Orçamento
  listarOrcamentos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  //Consultar Orçamento
  buscarOrcamentoPorId(id: number) {
    return this.http.get<Orcamento>(`${this.apiUrl}/${id}`);
  }
  // Alterar Orçamento
  alterarOrcamento(id: number, orcamento: Orcamento) {
    return this.http.put(`${this.apiUrl}/${id}`, orcamento);
  }
  // Excluir Orçamento
  excluir(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
