import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { PrivateLayoutComponent } from './_layout/private-layout/private-layout.component';
import { PublicLayoutComponent } from './_layout/public-layout/public-layout.component';
import { EditprofilComponent } from './editprofil/editprofil.component';
import { LeitstelleComponent } from './leitstelle/leitstelle.component';
import { LieferantenComponent } from './lieferanten/lieferanten.component';
import { LoginComponent } from './login';
import { LogoutComponent } from './login/logout/logout.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  // Public layout
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', component: LoginComponent }
    ]
  },
  // Private layout
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
      { path: 'editprofil', component: EditprofilComponent, canActivate: [AuthGuard] },
      { path: 'leitstellen', component: LeitstelleComponent, canActivate: [AuthGuard] },
      { path: 'lieferanten', component: LieferantenComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
      { path: 'kunden', loadChildren: () => import('./kunden/kunden.module').then(m => m.KundenModule), canActivate: [AuthGuard] }
    ],
  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'kunden' }
];

export const routing = RouterModule.forRoot(appRoutes, { scrollOffset: [0, 0], scrollPositionRestoration: 'top'});
