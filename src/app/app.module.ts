import { AngularFireModule } from 'angularfire2';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from './common.module';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { NoAccessComponent, NoContentComponent } from './components/error';
import { EditItemsComponent } from './components/admin';
import { LoginComponent, RegisterComponent } from './components/user';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { UiMessageComponent } from './components/ui-messages';
import { ItemFilterPipe } from './pipes';
import {
    AppRouterService,
    AuthService,
    LoadingService,
    UserService,
    UserAuthStatusService,
    UiMessageService
} from './services';
import { AdminUserGuard, AlreadyRegisteredGuard, AuthGuard, StandardUserGuard, LoginGuard } from './services/guards';
import { DropdownDirective } from './attribute-directives/dropdown.directive';
import { ReservationModule } from './components/reservations/reservation.module';

export const SHARED_DECLARATIONS = [
    AppComponent,
    NoContentComponent,
    HomeComponent,
    EditItemsComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    NoAccessComponent,
    LoadingComponent,
    ItemFilterPipe,
    UiMessageComponent,
    DropdownDirective,
];

export const SHARED_GUARDS = [
    AuthGuard,
    LoginGuard,
    StandardUserGuard,
    AlreadyRegisteredGuard,
    AdminUserGuard
];

export const SHARED_SERVICES = [
    AppRouterService,
    AuthService,
    LoadingService,
    UiMessageService,
    UserService,
    UserAuthStatusService,
    ItemFilterPipe
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
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, {useHash: true}),

        // our own modules
        CommonModule,
        ReservationModule
    ]
})
export class AppModule {
}

