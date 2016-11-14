import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EditItemsComponent } from './components/admin';
import { LoginComponent, RegisterComponent } from './components/user';
import { NoAccessComponent, NoContentComponent } from './components/error';
import { NewReservationComponent } from './components/reservation';
import { AdminUserGuard, AlreadyRegisteredGuard, AuthGuard, LoginGuard, StandardUserGuard } from './services/guards';

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },

    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard, StandardUserGuard]
    },

    {
        path: 'reservation/new',
        component: NewReservationComponent,
        canActivate: [AuthGuard, StandardUserGuard]
    },

    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },

    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AlreadyRegisteredGuard]
    },

    {
        path: 'admin/items/edit',
        component: EditItemsComponent,
        canActivate: [AuthGuard, AdminUserGuard]
    },

    {
        path: 'no-access',
        component: NoAccessComponent,
        canActivate: [AuthGuard]
    },

    {path: '**', component: NoContentComponent},
];
