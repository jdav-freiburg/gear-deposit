import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { CommonModule } from './common.module';
import { EditItemsComponent } from './components/admin-edit-items';
import { NoAccessComponent, NoContentComponent } from './components/error';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation';
import { UserLoginComponent } from './components/user-login';
import { UserRegisterComponent } from './components/user-register';
import { UpdateMinHeightToViewportDirective } from './directives/update-min-height-to-viewport.directive';
import {
    AdminUserGuard,
    ConfirmedUserGuard,
    IsAlreadyAuthorizedGuard,
    IsAlreadyRegisteredGuard,
    IsAuthorizedGuard,
    IsRegisteredGuard
} from './guards';
import { ReservationModule } from './modules/reservation';
import { AppRouterService, AuthService, UserAuthStatusService, UserService } from './services';

export const SHARED_DECLARATIONS = [
    AppComponent,
    NoContentComponent,
    NavigationComponent,
    HomeComponent,
    EditItemsComponent,
    UserRegisterComponent,
    UserLoginComponent,
    NoAccessComponent,
    UpdateMinHeightToViewportDirective
];

export const SHARED_GUARDS = [
    IsAuthorizedGuard,
    IsAlreadyAuthorizedGuard,
    IsRegisteredGuard,
    IsAlreadyRegisteredGuard,
    ConfirmedUserGuard,
    AdminUserGuard
];

export const SHARED_SERVICES = [
    AppRouterService,
    AuthService,
    UserService,
    UserAuthStatusService
];

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        ...SHARED_DECLARATIONS
    ],
    providers: [
        ...SHARED_GUARDS,
        ...SHARED_SERVICES
    ],
    imports: [
        // https://github.com/angular/angularfire2
        AngularFireModule.initializeApp({
            apiKey: 'AIzaSyAh1HzWeBkI8VmscctkxRzZNI6TQWOJFZk',
            authDomain: 'test-6b408.firebaseapp.com',
            databaseURL: 'https://test-6b408.firebaseio.com',
            storageBucket: 'test-6b408.appspot.com'
        }),

        BrowserModule,
        HttpModule,

        // currently # is needed for routes because I use firebase for hosting ...
        // with proper webserver config # isn't needed anymore
        RouterModule.forRoot(ROUTES, {useHash: true}),

        // our own modules
        CommonModule,
        ReservationModule
    ]
})
export class AppModule {
}

