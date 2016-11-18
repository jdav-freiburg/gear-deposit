import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewReservationComponent } from './new-reservation.component';
import { FormsModule } from '@angular/forms';
import { ItemComponent, ItemsComponent } from '../../items';
import { FooterComponent } from '../../footer/footer.component';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { ItemFilterPipe } from '../../../pipes';
import { AppRouterService, ItemService, ReservationService, UiMessageService, UserService } from '../../../services';
import { createItemServiceSpy, createUserServiceSpy } from '../../../../test-helpers';

describe('NewReservationComponent', () => {
    let component: NewReservationComponent;
    let fixture: ComponentFixture<NewReservationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                NewReservationComponent,
                NavBarComponent,
                ItemsComponent,
                ItemComponent,
                FooterComponent],
            providers: [
                {provide: AppRouterService, useValue: {}},
                {provide: ItemService, useValue: createItemServiceSpy()},
                {provide: ReservationService, useValue: {}},
                {provide: UiMessageService, useValue: {}},
                {provide: UserService, useValue: createUserServiceSpy()},
                ItemFilterPipe
            ],
            imports: [
                FormsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewReservationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
