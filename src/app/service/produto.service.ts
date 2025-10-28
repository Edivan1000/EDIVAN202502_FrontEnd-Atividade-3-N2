import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoCatalogo } from '../model/produto-catalogo';
import { ProdutoOpcao } from '../model/produto-opcao';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'http://localhost:8080/api/produtos'; // Ajuste a porta se necessário

  constructor(private http: HttpClient) { }

  // GET /api/produtos/catalogo
  // Busca a lista de produtos base (A1, A3, NUVEM)
  public listarProdutosBase(): Observable<ProdutoCatalogo[]> {
    return this.http.get<ProdutoCatalogo[]>(`${this.apiUrl}/catalogo`);
  }

  // GET /api/produtos/opcoes?catalogoId=X
  // Busca as opções de validade/preço de um produto
  public buscarOpcoesPorProduto(catalogoId: number): Observable<ProdutoOpcao[]> {
    return this.http.get<ProdutoOpcao[]>(`${this.apiUrl}/opcoes`, {
      params: { catalogoId: catalogoId.toString() }
    });
  }
}