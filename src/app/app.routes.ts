/* tslint:disable:no-empty-interface */

import { Route, Routes } from '@angular/router';
import { EditItemsComponent } from './components/admin-edit-items';
import { NoAccessComponent, NoContentComponent } from './components/error';
import { HomeComponent } from './components/home/home.component';
import { UserLoginComponent } from './components/user-login';
import { UserRegisterComponent } from './components/user-register';
import {
    AdminUserGuard,
    ConfirmedUserGuard,
    IsAlreadyAuthorizedGuard,
    IsAlreadyRegisteredGuard,
    IsAuthorizedGuard,
    IsRegisteredGuard
} from './guards';
import { EditReservationComponent, NewReservationComponent, ReservationsComponent } from './modules/reservation';

export interface AppRoute extends Route {
}

/**
 * @deprecated use strings directly instead - this is unusual for angular routing
 */
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
            IsAuthorizedGuard,
            IsRegisteredGuard
        ]
    },

    {
        path: ROUTE.RESERVATIONS.path,
        component: ReservationsComponent,
        canActivate: [
            IsAuthorizedGuard,
            ConfirmedUserGuard,
        ]
    },

    {
        path: ROUTE.RESERVATION_NEW.path,
        component: NewReservationComponent,
        canActivate: [
            IsAuthorizedGuard,
            ConfirmedUserGuard,
        ]
    },

    {
        path: 'reservations/:id/edit',
        component: EditReservationComponent,
        canActivate: [
            IsAuthorizedGuard,
            ConfirmedUserGuard,
        ]
    },

    {
        path: ROUTE.LOGIN.path,
        component: UserLoginComponent,
        canActivate: [IsAlreadyAuthorizedGuard]
    },

    {
        path: ROUTE.REGISTER.path,
        component: UserRegisterComponent,
        canActivate: [
            IsAuthorizedGuard,
            IsAlreadyRegisteredGuard
        ]
    },

    {
        path: ROUTE.ITEMS_EDIT.path,
        component: EditItemsComponent,
        canActivate: [
            IsAuthorizedGuard,
            ConfirmedUserGuard,
            AdminUserGuard
        ]
    },

    {
        path: ROUTE.NO_ACCESS.path,
        component: NoAccessComponent,
        canActivate: [IsAuthorizedGuard]
    },

    {path: '**', component: NoContentComponent},
];
