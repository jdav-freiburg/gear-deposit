import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { createItemServiceFake } from 'testing/fakes';
import {
    createComplexMockItems,
    createMockReservation,
    createReservationServiceFake,
    createUserServiceFake,
    MOCKED_REGISTERED_USER,
    ONE_DAY
} from '../../../../testing';
import { Item } from '../../../model';
import { ItemFilterPipe } from '../../../pipes';
import { ItemService, ReservationService } from '../../../services';
import { ReservationStateService } from './reservation-state.service';

const MOCKED_STACKS_SIZE = 6;
const MOCKED_STACK_ITEMS_SIZE = 4;

const NOW = new Date().getTime();

const CONCURRENT_RESERVATION = createMockReservation(1);

describe('Service: ReservationState', () => {

    let items: Item[];
    let itemService: ItemService;
    let reservationService: ReservationService;
    let reservationState: ReservationStateService;

    beforeEach(() => {
        const userService = createUserServiceFake();

        items = createComplexMockItems(MOCKED_STACKS_SIZE, MOCKED_STACK_ITEMS_SIZE);
        itemService = createItemServiceFake();
        spyOn(itemService, 'items$').and.returnValue(Observable.from([items]));

        reservationService = createReservationServiceFake();
        spyOn(reservationService, 'all$').and.returnValue(Observable.of([CONCURRENT_RESERVATION]));

        reservationState = new ReservationStateService(userService, itemService, reservationService,
            new ItemFilterPipe());
    });

    it('should be initialized', async(() => {
        expect(itemService.items$).toHaveBeenCalled();
        expect(reservationService.all$).toHaveBeenCalled();

        reservationState.initialized.subscribe(() => {
            expect(reservationState.reservation).toBeDefined();
            expect(reservationState.reservation.name).not.toBeDefined();
            expect(reservationState.reservation.begin).not.toBeDefined();
            expect(reservationState.reservation.end).not.toBeDefined();
            expect(reservationState.reservation.user).toBe(MOCKED_REGISTERED_USER);
            expect(reservationState.reservation.items.length).toEqual(0);

            expect(reservationState.stacks).toBeDefined();
            expect(reservationState.stacks.length).toEqual(MOCKED_STACKS_SIZE);
            reservationState.stacks.forEach((stack) => {
                expect(stack.items).toBeDefined();
                expect(stack.items.size).toEqual(MOCKED_STACK_ITEMS_SIZE);
            });

            expect(reservationState.added).toBeDefined();
            expect(reservationState.added.length).toEqual(0);
            expect(reservationState.addedCount).toEqual(0);
        });
    }));

    it('should return added items based on selected stacks', () => {
        reservationState.stacks[0].selected = true;
        reservationState.stacks[0].selectedCount = 1;
        reservationState.stacks[2].selected = true;
        reservationState.stacks[2].selectedCount = 2;

        expect(reservationState.added.length).toEqual(3);
        expect(reservationState.added[0]).toBe(Array.from(reservationState.stacks[0].items)[0]);
        expect(reservationState.added[1]).toBe(Array.from(reservationState.stacks[2].items)[0]);
        expect(reservationState.added[2]).toBe(Array.from(reservationState.stacks[2].items)[1]);
    });

    describe('blocked items', () => {

        beforeEach(() => {
            CONCURRENT_RESERVATION.begin = new Date(NOW - 7 * ONE_DAY);
            CONCURRENT_RESERVATION.end = new Date(NOW + 7 * ONE_DAY);
            CONCURRENT_RESERVATION.items = [
                /*stack0 > 2 items*/
                items[0],
                items[1],
                /*stack1* > 1 item*/
                items[6],
                /*stack5* > all (5) items*/
                items[20],
                items[21],
                items[22],
                items[23]
            ];
        });

        describe('(should block)', () => {
            describe('(begin change)', () => {
                //      | b    |
                it('should block when other reservation ends after new begin', () => {
                    reservationState.reservation.begin = new Date(NOW);
                });

                //      | b  e |
                it('should block when new reservation lays in between other reservation', () => {
                    reservationState.reservation.dates.end = new Date(NOW);
                    reservationState.reservation.begin = new Date(NOW - ONE_DAY);
                });

                //      | b    | e
                it('should block when new reservation overlaps with other reservation', () => {
                    reservationState.reservation.dates.end = new Date(NOW + 8 * ONE_DAY);
                    reservationState.reservation.begin = new Date(NOW);
                });
            });

            describe('(end change)', () => {
                // | e    |
                it('should block when other reservation ends before new end', () => {
                    reservationState.reservation.end = new Date(NOW);
                });

                // | b  e |
                it('should block when new reservation lays in between other reservation', () => {
                    reservationState.reservation.dates.begin = new Date(NOW);
                    reservationState.reservation.end = new Date(NOW + ONE_DAY);
                });

                // | b    | e
                it('should block when new reservation overlaps with other reservation', () => {
                    reservationState.reservation.dates.begin = new Date(NOW);
                    reservationState.reservation.end = new Date(NOW + 8 * ONE_DAY);
                });
            });

            afterEach(() => {
                expect(reservationState.stacks[0].blockedCount)
                    .toEqual(2, 'expected 2 items to be blocked in 1st stack');
                expect(reservationState.stacks[0].blocked).toBe(false, 'expected 1st stack not to be blocked');
                expect(reservationState.stacks[1].blockedCount)
                    .toEqual(1, 'expected 1 item to be blocked in 2nd stack');
                expect(reservationState.stacks[1].blocked).toBe(false, 'expected 2nd stack not to be blocked');
                expect(reservationState.stacks[2].blockedCount).toEqual(0, 'expected 3rd stack not to be blocked');
                expect(reservationState.stacks[3].blockedCount).toEqual(0, 'expected 4th stack not to be blocked');
                expect(reservationState.stacks[4].blockedCount).toEqual(0, 'expected 5th stack not to be blocked');
                expect(reservationState.stacks[5].blockedCount)
                    .toEqual(4, 'expected 4 items to be blocked in 6th stack');
                expect(reservationState.stacks[5].blocked).toBe(true, 'expected 6th stack to be blocked');
            });
        });

        describe('(shouldn\'t block)', () => {
            describe('(begin change) ', () => {
                // b  e |      |
                it('shouldn\'t block when new reservation starts and ends before other reservation', () => {
                    reservationState.reservation.dates.end = new Date(NOW - 8 * ONE_DAY);
                    reservationState.reservation.begin = new Date(NOW - 9 * ONE_DAY);
                });

                //      |      | b  e
                it('shouldn\'t block when new reservation starts and ends after other reservation', () => {
                    reservationState.reservation.dates.end = new Date(NOW + 9 * ONE_DAY);
                    reservationState.reservation.begin = new Date(NOW + 8 * ONE_DAY);
                });
            });

            describe('(end change)', () => {
                // b  e |      |
                it('shouldn\'t block when new reservation starts and ends before other reservation', () => {
                    reservationState.reservation.dates.begin = new Date(NOW - 9 * ONE_DAY);
                    reservationState.reservation.end = new Date(NOW - 8 * ONE_DAY);
                });

                //      |      | b  e
                it('shouldn\'t block when new reservation starts and ends after other reservation', () => {
                    reservationState.reservation.dates.begin = new Date(NOW + 8 * ONE_DAY);
                    reservationState.reservation.end = new Date(NOW + 9 * ONE_DAY);
                });
            });

            afterEach(() => {
                expect(reservationState.stacks[0].blockedCount).toEqual(0, 'expected 1st stack not to be blocked');
                expect(reservationState.stacks[1].blockedCount).toEqual(0, 'expected 2nd stack not to be blocked');
                expect(reservationState.stacks[2].blockedCount).toEqual(0, 'expected 3rd stack not to be blocked');
                expect(reservationState.stacks[3].blockedCount).toEqual(0, 'expected 4th stack not to be blocked');
                expect(reservationState.stacks[4].blockedCount).toEqual(0, 'expected 5th stack not to be blocked');
                expect(reservationState.stacks[5].blockedCount).toEqual(0, 'expected 6th stack not to be blocked');
            });
        });

    });

});
