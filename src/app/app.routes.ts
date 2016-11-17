import { Routes, Route } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EditItemsComponent } from './components/admin';
import { LoginComponent, RegisterComponent } from './components/user';
import { NoAccessComponent, NoContentComponent } from './components/error';
import { ReservationsComponent, EditReservationComponent, NewReservationComponent } from './components/reservations';
import { AdminUserGuard, AlreadyRegisteredGuard, AuthGuard, LoginGuard, StandardUserGuard } from './services/guards';

export interface AppRoute extends Route {
}

export const ROUTE = {
    HOME: <AppRoute>{
        path: 'home'
    },
    RESERVATIONS: <AppRoute>{
        path: 'reservations'
    },
    RESERVATION_NEW: <AppRoute>{
        path: 'reservations/new'
    },
    LOGIN: <AppRoute>{
        path: 'login'
    },
    REGISTER: <AppRoute>{
        path: 'register'
    },
    ITEMS_EDIT: <AppRoute>{
        path: 'admin/items/edit'
    },
    NO_ACCESS: <AppRoute>{
        path: 'no-access'
    }
};

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/' + ROUTE.HOME.path,
        pathMatch: 'full'
    },

    {
        path: ROUTE.HOME.path,
        component: HomeComponent,
        canActivate: [
            AuthGuard,
            StandardUserGuard
        ]
    },

    {
        path: ROUTE.RESERVATIONS.path,
        component: ReservationsComponent,
        canActivate: [
            AuthGuard,
            StandardUserGuard
        ]
    },

    {
        path: ROUTE.RESERVATION_NEW.path,
        component: NewReservationComponent,
        canActivate: [
            AuthGuard,
            StandardUserGuard
        ]
    },

    {
        path: 'reservations/:id/edit',
        component: EditReservationComponent,
        canActivate: [
            AuthGuard,
            StandardUserGuard
        ]
    },

    {
        path: ROUTE.LOGIN.path,
        component: LoginComponent,
        canActivate: [LoginGuard]
    },

    {
        path: ROUTE.REGISTER.path,
        component: RegisterComponent,
        canActivate: [AlreadyRegisteredGuard]
    },

    {
        path: ROUTE.ITEMS_EDIT.path,
        component: EditItemsComponent,
        canActivate: [
            AuthGuard,
            AdminUserGuard
        ]
    },

    {
        path: ROUTE.NO_ACCESS.path,
        component: NoAccessComponent,
        canActivate: [AuthGuard]
    },

    {path: '**', component: NoContentComponent},
];
