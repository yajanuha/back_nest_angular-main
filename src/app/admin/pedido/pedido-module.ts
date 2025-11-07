import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPedido } from './components/lista-pedido/lista-pedido';
import { NuevoPedido } from './components/nuevo-pedido/nuevo-pedido';



@NgModule({
  declarations: [
    ListaPedido,
    NuevoPedido
  ],
  imports: [
    CommonModule
  ]
})
export class PedidoModule { }
