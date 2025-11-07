import { Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';

export const routes: Routes = [
    {path: 'admin', loadChildren:()=>import('./admin/admin.module').then(adm=>adm.AdminModule)},
    { path: 'auth', loadChildren:()=>import('./auth/auth.module').then(aut=>aut.AuthModule)}
];
