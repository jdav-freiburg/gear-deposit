import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { createAuthServiceFake } from '../../../testing';
import { AuthService } from '../../services';
import { UserLoginComponent } from './user-login.component';

describe('UserLoginComponent', () => {
    let component: UserLoginComponent;
    let fixture: ComponentFixture<UserLoginComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [UserLoginComponent],
            providers: [
                {provide: AuthService, useValue: createAuthServiceFake()}
            ],
            imports: [
                FormsModule
            ]
        });

        fixture = TestBed.createComponent(UserLoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show google login', () => {
        const googleLoginButton = fixture.debugElement.query(By.css('button')).nativeElement;
        expect(googleLoginButton.textContent).toContain('Mit Google anmelden');
    });

});
