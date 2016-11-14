import { Routes } from '@angular/router';
import { NoContentComponent } from './components/error/no-content/no-content.component';
import { HomeComponent } from './components/home/home.component';
import { EditItemsComponent } from './components/admin/items/edit-items.component';
import { AdminUserGuard } from './services/guards/admin-user-guard.service';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './services/guards/auth-guard.service';
import { NoAccessComponent } from './components/error/no-access/no-access.component';
import { StandardUserGuard } from './services/guards/standard-user-guard.service';
import { LoginGuard } from './services/guards/login-guard.service';
import { AlreadyRegisteredGuard } from './services/guards/already-registered-guard.service';
import { NewReservationComponent } from './components/reservation/new/new-reservation.component';

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
        path: 'admin/items',
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
