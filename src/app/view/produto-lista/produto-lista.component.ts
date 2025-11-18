import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../../model/produto';
import { ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-produto-lista',
  standalone: false,
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.css']
})
export class ProdutoListaComponent implements OnInit {

  produtos!: Produto[];

  constructor(private produtoService: ProdutoService, private router: Router){}

  ngOnInit(): void {
      this.listarProdutos();
  }

  private listarProdutos(){
    this.produtoService.listarProdutos().subscribe(data => {
      this.produtos = data;
    });
  }

  alterarProduto(codigo: number){
    this.router.navigate(['produto-altera', codigo]);
  }

  inserirProduto(){
    this.router.navigate(['produto-insere']);
  }

  consultarProduto(codigo: number){
    this.router.navigate(['produto-consulta', codigo]);
  }

  excluirProduto(codigo: number){
    if(confirm("Deseja realmente excluir o produto?")){
      this.produtoService.excluirProduto(codigo).subscribe(data =>{
        console.log(data);
        this.listarProdutos();
      });
    }
  }

}
