import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CategoriaComponent } from './pages/categoria/categoria';
import { Registro } from './pages/registro/registro';
import { Perfil } from './pages/perfil/perfil';
import { Recuperar } from './pages/recuperar/recuperar';
import { Dashboard } from './pages/dashboard/dashboard';
import { AdminJuegos } from './pages/admin-juegos/admin-juegos';

import { authGuard  } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'categorias/:slug', component: CategoriaComponent },
  { path: 'registro', component: Registro },
  { path: 'perfil', component: Perfil, canActivate: [authGuard] },
  { path: 'recuperar', component: Recuperar },
  { path: 'admin/dashboard', component: Dashboard, canActivate: [adminGuard] },
  { path: 'admin/juegos', component: AdminJuegos, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];
