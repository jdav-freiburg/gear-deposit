import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService, UiMessageService, UserAuthStatusService, LoadingService } from './services';
import { LoadingComponent } from './components/loading/loading.component';
import { UiMessageComponent } from './components/ui-messages';
import { RouterStub } from '../testing';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                LoadingComponent,
                UiMessageComponent
            ],
            providers: [
                UiMessageService,
                LoadingService,
                {provide: AuthService, useValue: {}},
                {provide: UserAuthStatusService, useValue: {}},
                {provide: Router, useClass: RouterStub}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

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
