import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';
import { Fakes, Mocks, Utils } from '../../../../../testing';
import { ItemStackComponent } from '../../../../components/items/item-stack/item-stack.component';
import { SimpleItemListComponent } from '../../../../components/items/simple-item-list/simple-item-list.component';
import { LoadingService, ReservationService, UiMessageService } from '../../../../services';
import { ReservationsComponent } from './reservations.component';

describe('ReservationsComponent', () => {

    let fixture: ComponentFixture<ReservationsComponent>;

    class Page {
        static get reservations() {
            return Utils.debugElementsByCss(fixture, '.card');
        }

        static get itemLists() {
            return Utils.debugElementsByCss(fixture, 'jgd-simple-item-list');
        }

        static get errorMessage() {
            return Utils.debugElementByCss(fixture, 'p');
        }
    }

    let reservationService: ReservationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                ReservationsComponent,
                SimpleItemListComponent,
                ItemStackComponent
            ],
            providers: [
                UiMessageService,
                LoadingService,
                ...Fakes.PROVIDERS
            ]
        });

        fixture = TestBed.createComponent(ReservationsComponent);
        reservationService = TestBed.get(ReservationService);
    });

    it('should emit loading while requesting data and report when data was loaded', () => {
        const loadingService: LoadingService = fixture.debugElement.injector.get(LoadingService);
        const loadEmitted: boolean[] = [];
        loadingService.loading.subscribe(l => loadEmitted.push(l));
        fixture.detectChanges();

        expect(loadEmitted.length).toEqual(2);
        expect(loadEmitted[0]).toBe(true);
        expect(loadEmitted[1]).toBe(false);
    });

    it('should show message when there are no reservations', () => {
        spyOn(reservationService, 'all$').and.returnValue(Observable.of([]));
        fixture.detectChanges();

        expect(Page.errorMessage.nativeElement.textContent).toContain('Keine aktuellen Reservierungen');
    });

    it('should render reservations', () => {
        fixture.detectChanges();

        expect(Page.reservations.length).toEqual(Mocks.MOCKED_RESERVATIONS.length);
        expect(Page.itemLists.length).toEqual(Mocks.MOCKED_RESERVATIONS.length);
    });

    // FIXME enable test
    xit('should remove reservation', () => {
        fixture.detectChanges();

        const deleteButton = Page.reservations[1].query(By.css('button'));
        spyOn(reservationService, 'remove').and.callThrough();

        deleteButton.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(reservationService.remove).toHaveBeenCalledWith(Mocks.MOCKED_RESERVATIONS[1].id);
        expect(Page.reservations.length).toEqual(Mocks.MOCKED_RESERVATIONS.length - 1);
        expect(Page.itemLists.length).toEqual(Mocks.MOCKED_RESERVATIONS.length - 1);
    })
    ;

});
