import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../services';
import { createAuthServiceSpy } from '../../../../test-helpers';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [
                {provide: AuthService, useValue: createAuthServiceSpy()}
            ],
            imports: [
                FormsModule
            ]
        }) .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show google login', () => {
        let googleLoginButton = fixture.debugElement.query(By.css('button')).nativeElement;
        expect(googleLoginButton.textContent).toContain('Mit Google anmelden');
    });

});
