import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaCertificado } from '../model/categoriacertificado';

@Injectable({
  providedIn: 'root'
})
export class CategoriaCertificadoService {

  private url = "http://localhost:8080/ccategoria/categoria";

  constructor(private httpClient: HttpClient) { }

  //Listar as categorias de certificado a partir da chamada do método da API Rest que está contida na URL especificada
  listarCategorias(): Observable<CategoriaCertificado[]>{
    return this.httpClient.get<CategoriaCertificado[]>(`${this.url}`);
  }

  //Consultar a categoria a partir do ID informado
  consultarCategoria(codigo: number): Observable<CategoriaCertificado>{
    return this.httpClient.get<CategoriaCertificado>(`${this.url}/${codigo}`);
  }

  //Método para incluir uma nova categoria, a partir da chamada HTTP REST, tipo POST
  incluirCategoria(categoria: CategoriaCertificado): Observable<Object>{
    return this.httpClient.post(`${this.url}`, categoria);
  }

  //Método para alterar uma categoria, a partir da chamada HTTP REST, tipo PUT
  alterarCategoria(codigo: number, categoria: CategoriaCertificado): Observable<Object>{
    return this.httpClient.put(`${this.url}/${codigo}`, categoria);
  }

  //Método para excluir uma categoria, a partir da chamada HTTP REST, tipo DELETE
  excluirCategoria(codigo: number): Observable<Object>{
    return this.httpClient.delete(`${this.url}/${codigo}`);
  }
}
