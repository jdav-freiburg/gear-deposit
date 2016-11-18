/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { AuthService, UserAuthStatusService } from '../../services/';
import { createUserAuthStatusServiceSpy } from '../../../test-helpers';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                HeaderComponent,
                NavBarComponent
            ],
            providers: [
                {provide: AuthService, useValue: {}},
                {provide: UserAuthStatusService, useValue: createUserAuthStatusServiceSpy()},
                {provide: Router, useValue: {}}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
