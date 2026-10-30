import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/authGuard/auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'customers',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'customers/new',
    loadComponent: () => import('./features/customers/customer-form/customer-form.page').then((m) => m.CustomerFormPage),
  },
  {
    path: 'customers/:code/edit',
    loadComponent: () => import('./features/customers/customer-form/customer-form.page').then((m) => m.CustomerFormPage),
  },
  {
    path: 'customers/:code',
    loadComponent: () => import('./features/customers/customer-detail/customer-detail.page').then((m) => m.CustomerDetailPage),
  },
  {
    path: 'customers',
    loadComponent: () => import('./features/customers/customer-list/customer-list.page').then((m) => m.CustomerListPage),
  },
  {
    path: 'sales/new',
    loadComponent: () => import('./features/sales/new-sale/new-sale.page').then((m) => m.NewSalePage),
  },
  {
    path: 'recovery/monthly',
    loadComponent: () => import('./features/recovery/monthly-sheet/monthly-sheet.page').then((m) => m.MonthlySheetPage),
  },
  {
    path: 'recovery',
    loadComponent: () => import('./features/recovery/today-recovery/today-recovery.page').then((m) => m.TodayRecoveryPage),
  },
  {
    path: 'employees/new',
    canActivate: [authGuard],
    loadComponent: () => import('./features/employees/employee-form/employee-form.page').then((m) => m.EmployeeFormPage),
  },
  {
    path: 'employees',
    canActivate: [authGuard],
    loadComponent: () => import('./features/employees/employee-list/employee-list.page').then((m) => m.EmployeeListPage),
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.page').then((m) => m.ProfilePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
];
