import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { createAuthServiceFake, MOCKED_AUTH_USER } from '../../../testing';
import { AuthService, UserService } from '../../services';
import { UserRegisterComponent } from './';

describe('RegisterComponent', () => {
    let component: UserRegisterComponent;
    let fixture: ComponentFixture<UserRegisterComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                UserRegisterComponent
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

        fixture = TestBed.createComponent(UserRegisterComponent);
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
