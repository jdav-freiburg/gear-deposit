import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RegisterComponent } from './register.component';
import { AuthService, UserService } from '../../../services';
import { LoadingComponent } from '../../loading/loading.component';
import { MOCKED_AUTH_USER, createAuthServiceFake } from '../../../../testing';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                RegisterComponent,
                LoadingComponent
            ],
            providers: [
                {provide: AuthService, useValue: createAuthServiceFake()},
                {provide: UserService, useValue: {}},
                {provide: Router, useValue: {}}
            ],
            imports: [
                FormsModule
            ]
        });

        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fill in user name', () => {
        const nameInput = fixture.debugElement.query(By.css('#name')).nativeElement;
        expect(nameInput.placeholder).toEqual(MOCKED_AUTH_USER.displayName);
    });

    it('should fill in user email', () => {
        const emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
        expect(emailInput.placeholder).toEqual(MOCKED_AUTH_USER.email);
    });

});
