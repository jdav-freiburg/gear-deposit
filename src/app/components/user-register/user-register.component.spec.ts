import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Fakes, Mocks } from '../../../testing';
import { AuthService, UserService } from '../../services';
import { UserRegisterComponent } from './';

describe('RegisterComponent', () => {
    let component: UserRegisterComponent;
    let fixture: ComponentFixture<UserRegisterComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                RouterTestingModule
            ],
            declarations: [
                UserRegisterComponent
            ],
            providers: [
                {provide: AuthService, useValue: Fakes.createAuthServiceFake()},
                {provide: UserService, useValue: {}}
            ]
        });

        fixture = TestBed.createComponent(UserRegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should fill in user name', () => {
        const nameInput = fixture.debugElement.query(By.css('#name')).nativeElement;
        expect(nameInput.placeholder).toEqual(Mocks.MOCKED_AUTH_USER.displayName);
    });

    it('should fill in user email', () => {
        const emailInput = fixture.debugElement.query(By.css('#email')).nativeElement;
        expect(emailInput.placeholder).toEqual(Mocks.MOCKED_AUTH_USER.email);
    });

});
