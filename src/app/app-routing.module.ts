import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  {path: 'login',  component: LoginComponent,  data: { title: 'Login'}},
  {path: 'login/:error',  component: LoginComponent,  data: { title: 'Login'}},
  {path: '',  component: RedirectComponent  },
];

export const APP_ROUTES = RouterModule.forRoot( routes, {useHash: true} );
