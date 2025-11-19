import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private url = "http://localhost:8080/cproduto/produto";

  constructor(private httpClient: HttpClient) { }

  //Métodos que consomem os serviços HTTP do backend

  listarProdutos(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(`${this.url}`);
  }

  inserirProduto(produto: Produto): Observable<object> {
    return this.httpClient.post(`${this.url}`, produto);
  }

  alterarProduto(codigo: number, produto: Produto): Observable<object> {
    return this.httpClient.put(`${this.url}/${codigo}`, produto);
  }

  excluirProduto(codigo: number): Observable<object> {
    return this.httpClient.delete(`${this.url}/${codigo}`);
  }

  consultarProduto(codigo: number): Observable<Produto> {
    return this.httpClient.get<Produto>(`${this.url}/${codigo}`);
  }
}