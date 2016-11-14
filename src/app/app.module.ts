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
import { InfoMessageComponent } from './components/ui-messages';
import { NewReservationComponent } from './components/reservation';
import { ItemComponent, ItemsComponent } from './components/items';
import { ItemFilterPipe } from './pipes';
import { AuthService, ItemService, UserService, UserAuthStatusService, UiMessageService } from './services';
import { AdminUserGuard, AlreadyRegisteredGuard, AuthGuard, StandardUserGuard, LoginGuard } from './services/guards';
import { FooterComponent } from './components/footer/footer.component';

export const GUARDS = [
    AuthGuard,
    LoginGuard,
    StandardUserGuard,
    AlreadyRegisteredGuard,
    AdminUserGuard
];

export const SERVICES = [
    AuthService,
    UserService,
    UserAuthStatusService,
    ItemService,
    UiMessageService,
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
        InfoMessageComponent,
        NewReservationComponent,
        ItemsComponent,
        ItemComponent,
        FooterComponent,
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
        // angular core
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, {useHash: true}),
    ]
})
export class AppModule {
}

