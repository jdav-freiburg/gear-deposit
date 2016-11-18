import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HeaderComponent } from './components/header/header.component';
import { UiMessageComponent } from './components/ui-messages/ui-message.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthService, UiMessageService, UserAuthStatusService } from './services';
import { createUserAuthStatusServiceSpy } from '../test-helpers';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                LoadingComponent,
                HeaderComponent,
                NavBarComponent,
                UiMessageComponent
            ],
            providers: [
                UiMessageService,
                {provide: AuthService, useValue: {}},
                {provide: UserAuthStatusService, useValue: createUserAuthStatusServiceSpy()},
                {provide: Router, useValue: {}},
            ],
            imports: [
                RouterModule
            ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it(`should be loading`, () => {
        expect(component.loading).toEqual(true);
    });

    it('should not show message', () => {
        expect(component.message).not.toBeDefined();
        expect(component.showMessage).toEqual(false);
    });

});
