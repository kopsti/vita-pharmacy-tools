import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@utils/auth.guard';

const routes: Routes = [
  {path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]},
  {path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)},
  {
    path: 'suppliers',
    loadChildren: () => import('./features/suppliers/suppliers.module').then(m => m.SuppliersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'bank-accounts',
    loadChildren: () => import('./features/bank-accounts/bank-accounts.module').then(m => m.BankAccountsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'banks',
    loadChildren: () => import('./features/banks/banks.module').then(m => m.BanksModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./features/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AuthGuard]
  },
  {path: 'verbals', loadChildren: () => import('./features/verbals/verbals.module').then(m => m.VerbalsModule), canActivate: [AuthGuard]},
  {path: 'orders', loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule), canActivate: [AuthGuard]},
  {path: 'notes', loadChildren: () => import('./features/notes/notes.module').then(m => m.NotesModule), canActivate: [AuthGuard]},
  {path: 'caches', loadChildren: () => import('./features/caches/caches.module').then(m => m.CachesModule), canActivate: [AuthGuard]},
  // used for not found pages or without permission
  {path: '**', redirectTo: '404'},
  {path: '404', loadChildren: () => import('./features/not-found/not-found.module').then(m => m.NotFoundModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
