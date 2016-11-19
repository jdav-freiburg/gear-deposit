import { AngularFireModule } from 'angularfire2';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { NoAccessComponent, NoContentComponent } from './components/error';
import { EditItemsComponent } from './components/admin';
import { LoginComponent, RegisterComponent } from './components/user';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UiMessageComponent } from './components/ui-messages';
import { ReservationsComponent, NewReservationComponent } from './components/reservations';
import { ItemComponent, ItemsComponent } from './components/items';
import { ItemFilterPipe } from './pipes';
import {
    AppRouterService,
    AuthService,
    ItemService,
    LoadingService,
    ReservationService,
    UserService,
    UserAuthStatusService,
    UiMessageService
} from './services';
import { AdminUserGuard, AlreadyRegisteredGuard, AuthGuard, StandardUserGuard, LoginGuard } from './services/guards';
import { FooterComponent } from './components/footer/footer.component';
import { DropdownDirective } from './attribute-directives/dropdown.directive';
import { EditReservationComponent } from './components/reservations/edit/edit-reservation.component';

export const GUARDS = [
    AuthGuard,
    LoginGuard,
    StandardUserGuard,
    AlreadyRegisteredGuard,
    AdminUserGuard
];

export const SERVICES = [
    AppRouterService,
    AuthService,
    ItemService,
    ReservationService,
    LoadingService,
    UiMessageService,
    UserService,
    UserAuthStatusService,
    ItemFilterPipe
];

export const SHARED_MODULES = [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
];

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
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
        NavBarComponent,
        UiMessageComponent,
        NewReservationComponent,
        ItemsComponent,
        ItemComponent,
        FooterComponent,
        DropdownDirective,
        ReservationsComponent,
        EditReservationComponent,
    ],
    providers: [
        ...GUARDS,
        ...SERVICES
    ],
    imports: [
        // https://github.com/angular/angularfire2
        AngularFireModule.initializeApp({
            apiKey: 'AIzaSyAh1HzWeBkI8VmscctkxRzZNI6TQWOJFZk',
            authDomain: 'test-6b408.firebaseapp.com',
            databaseURL: 'https://test-6b408.firebaseio.com',
            storageBucket: 'test-6b408.appspot.com'
        }),
        ...SHARED_MODULES
    ]
})
export class AppModule {
}

