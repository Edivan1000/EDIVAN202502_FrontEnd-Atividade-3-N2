// src/app/services/empresa.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../model/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private apiUrl = 'http://localhost:8080/api/empresas'; // EndPoint que definimos no Spring Boot

  constructor(private http: HttpClient) { }

  // ADICIONE ESTE MÉTODO (ou corrija o nome se ele já existir)
  listarTodas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiUrl);
  }

  public listarEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.apiUrl);
  }

  public incluirEmpresa(empresa: Empresa): Observable<Empresa> {
    // O mesmo POST/PUT que o Spring Boot Controller espera
    return this.http.post<Empresa>(this.apiUrl, empresa);
  }
  
  public consultarEmpresa(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.apiUrl}/${id}`);
  }
  
  // Incluir excluirEmpresa() se necessário
}