import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { roleGuard } from './core/auth/role.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { AcceptInviteComponent } from './pages/accept-invite/accept-invite.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'accept-invite', component: AcceptInviteComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [authGuard, roleGuard(['Admin'])]
  },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
];
