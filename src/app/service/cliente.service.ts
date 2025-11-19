import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = "http://localhost:8080/ccliente/cliente";

  constructor(private httpClient: HttpClient) { }

  // Listar todos os clientes
  listarClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(`${this.url}`);
  }

  // Consultar cliente pelo ID
  consultarCliente(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.url}/${id}`);
  }

  // Incluir novo cliente
  incluirCliente(cliente: Cliente): Observable<Object> {
    return this.httpClient.post(`${this.url}`, cliente);
  }

  // Alterar cliente existente
  alterarCliente(id: number, cliente: Cliente): Observable<Object> {
    return this.httpClient.put(`${this.url}/${id}`, cliente);
  }

  // Excluir cliente
  excluirCliente(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
