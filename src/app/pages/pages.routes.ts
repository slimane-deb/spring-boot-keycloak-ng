import { RouterModule, Routes } from '@angular/router';

//guards
import { AuthGuardService } from '../services/auth/guards/auth-guard.service';

//component
import { ContentComponent } from './content/content.component';
import { TableComponent } from './content/table/table.component';

const pagesRoutes: Routes = [
  {
    path: 'home',
    component: ContentComponent,
    canActivate: [AuthGuardService],
    children : [{
      path: '',
      component: TableComponent,
      canActivate: [AuthGuardService]
    }]
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
