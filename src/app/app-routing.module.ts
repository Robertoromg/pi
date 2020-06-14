import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'gastos', loadChildren: './gastos/gastos.module#GastosPageModule' },
  { path: 'add-gastos', loadChildren: './add-gastos/add-gastos.module#AddGastosPageModule' },
  { path: 'add-gastos/:id/:motivo/:valor', loadChildren: './add-gastos/add-gastos.module#AddGastosPageModule' },
  { path: 'vendas', loadChildren: './vendas/vendas.module#VendasPageModule' },
  { path: 'pagamentos', loadChildren: './pagamentos/pagamentos.module#PagamentosPageModule' },
  { path: 'compras', loadChildren: './compras/compras.module#ComprasPageModule' },
  { path: 'movimentacoes', loadChildren: './movimentacoes/movimentacoes.module#MovimentacoesPageModule' },
  { path: 'add-vendas', loadChildren: './add-vendas/add-vendas.module#AddVendasPageModule' },
  { path: 'add-vendas/:id/:produto/:valor', loadChildren: './add-vendas/add-vendas.module#AddVendasPageModule' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
