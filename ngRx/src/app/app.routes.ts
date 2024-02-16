import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path:'',
    redirectTo: '/register',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren : () =>
      import ('../app/auth/auth.routes').then(m => m.registerRoutes)
  }
];
