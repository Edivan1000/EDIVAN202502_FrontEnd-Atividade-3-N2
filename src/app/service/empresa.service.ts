import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../model/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private url = "http://localhost:8080/cempresa/empresa";

  constructor(private httpClient: HttpClient) { }

  // Listar todas as empresas
  listarEmpresas(): Observable<Empresa[]> {
    return this.httpClient.get<Empresa[]>(`${this.url}`);
  }

  // Consultar empresa pelo ID
  consultarEmpresa(id: number): Observable<Empresa> {
    return this.httpClient.get<Empresa>(`${this.url}/${id}`);
  }

  // Incluir nova empresa
  incluirEmpresa(empresa: Empresa): Observable<Object> {
    return this.httpClient.post(`${this.url}`, empresa);
  }

  // Alterar empresa existente
  alterarEmpresa(id: number, empresa: Empresa): Observable<Object> {
    return this.httpClient.put(`${this.url}/${id}`, empresa);
  }

  // Excluir empresa
  excluirEmpresa(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
