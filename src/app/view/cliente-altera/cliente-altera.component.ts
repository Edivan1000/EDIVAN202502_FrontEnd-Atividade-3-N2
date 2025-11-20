import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../model/cliente';
import { EnderecoCliente } from '../../model/enderecocliente';
import { ClienteService } from '../../service/cliente.service';

@Component({
  selector: 'app-cliente-altera',
  standalone: false,
  templateUrl: './cliente-altera.component.html',
  styleUrls: ['./cliente-altera.component.css']
})
export class ClienteAlteraComponent implements OnInit {
  @ViewChild('clienteForm') clienteForm!: NgForm;

  cliente: Cliente = new Cliente();
  endereco: EnderecoCliente = new EnderecoCliente();

  // Cópias originais para comparação
  originalCliente: Cliente = new Cliente();
  originalEndereco: EnderecoCliente = new EnderecoCliente();

  semNumero: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.clienteService.consultarCliente(id).subscribe({
        next: (dados) => {
          this.cliente = dados;
          this.endereco = dados.endereco || new EnderecoCliente();

          // Guardar cópias originais para validação de alterações
          this.originalCliente = { ...this.cliente };
          this.originalEndereco = { ...this.endereco };

          // Resetar formulário para estado pristine com todos os campos
          setTimeout(() => {
            if (this.clienteForm) {
              this.clienteForm.reset({
                // Dados Pessoais
                nome: this.cliente.nome,
                cpfCnpj: this.cliente.cpfCnpj,
                telefone: this.cliente.telefone,
                email: this.cliente.email,

                // Endereço
                cep: this.endereco.cep,
                logradouro: this.endereco.logradouro,
                numero: this.endereco.numero,
                bairro: this.endereco.bairro,
                cidade: this.endereco.cidade,
                estado: this.endereco.estado,

                // Checkbox S/N
                sn: this.semNumero
              });
              console.log("Formulário resetado com valores iniciais. Estado: PRISTINE.");
            }
          });
        },
        error: (err) => {
          console.error('Erro ao carregar cliente', err);
          alert('Erro ao carregar os dados do cliente.');
        }
      });
    }
  }

  permitirSomenteNumeros(event: KeyboardEvent): void {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  salvarAlteracoes(form: NgForm): void {
    // Verifica se houve alteração real nos campos
    const clienteAlterado = JSON.stringify(this.cliente) !== JSON.stringify(this.originalCliente);
    const enderecoAlterado = JSON.stringify(this.endereco) !== JSON.stringify(this.originalEndereco);

    if (!clienteAlterado && !enderecoAlterado) {
      alert("Por favor, altere pelo menos um campo para salvar."); 
      return;
    }

    // Continua o salvamento normalmente
    this.cliente.endereco = this.endereco;

    this.clienteService.alterarCliente(this.cliente.id, this.cliente).subscribe({
      next: () => {
        alert('Cliente alterado com sucesso!');
        this.router.navigate(['cliente-lista']);
      },
      error: (err) => {
        console.error('Erro ao alterar cliente', err);
        alert('Erro ao alterar cliente. Verifique os dados e tente novamente.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['cliente-lista']);
  }
}
