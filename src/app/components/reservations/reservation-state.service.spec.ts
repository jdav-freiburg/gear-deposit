import { Observable } from 'rxjs/Rx';
import { ReservationStateService } from './';
import {
    createUserServiceFake,
    createItemServiceFake,
    createReservationServiceFake,
    MOCKED_REGISTERED_USER,
    createComplexMockItems,
    MOCKED_RESERVATIONS
} from '../../../testing';
import { ItemFilterPipe } from '../../pipes';
import { ItemStack, Item } from '../../model';
import { ItemService, ReservationService } from '../../services';

const MOCKED_STACKS_SIZE = 6;
const MOCKED_STACK_ITEMS_SIZE = 4;

const NOW = new Date().getTime();
const ONE_DAY = 24 * 60 * 60 * 1000;

describe('Service: ReservationState', () => {

    let items: Item[];
    let itemService: ItemService;
    let reservationService: ReservationService;
    let reservationState: ReservationStateService;

    beforeEach(() => {
        let userService = createUserServiceFake();

        items = createComplexMockItems(MOCKED_STACKS_SIZE, MOCKED_STACK_ITEMS_SIZE);
        itemService = createItemServiceFake();
        spyOn(itemService, 'items$').and.returnValue(Observable.from([items]));

        reservationService = createReservationServiceFake();
        spyOn(reservationService, 'all$').and.callThrough();

        reservationState = new ReservationStateService(userService, itemService, reservationService,
            new ItemFilterPipe());
    });

    it('should be initialized', () => {
        expect(itemService.items$).toHaveBeenCalled();
        expect(reservationService.all$).toHaveBeenCalled();

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

        expect(reservationState.selected).toBeDefined();
        expect(reservationState.selected.size).toEqual(0);

        expect(reservationState.added).toBeDefined();
        expect(reservationState.added.length).toEqual(0);
        expect(reservationState.addedCount).toEqual(0);
    });

    it('should store selected items', () => {
        let selected: ItemStack[] = [];
        selected.push(reservationState.stacks[0]);
        selected.push(reservationState.stacks[2]);

        reservationState.select(selected);

        expect(reservationState.stacks.length).toEqual(MOCKED_STACKS_SIZE);
        expect(reservationState.selected.size).toEqual(2);
        expect(reservationState.selected.has(selected[0])).toBe(true);
        expect(reservationState.selected.has(selected[1])).toBe(true);
    });

    it('should modify stored selected items', () => {
        let selected: ItemStack[] = [];
        selected.push(reservationState.stacks[0]);
        selected.push(reservationState.stacks[1]);
        selected.push(reservationState.stacks[2]);
        selected.push(reservationState.stacks[3]);

        let deselected: ItemStack[] = [];
        deselected.push(reservationState.stacks[0]);
        deselected.push(reservationState.stacks[2]);

        reservationState.select(selected);
        reservationState.deselect(deselected);

        expect(reservationState.stacks.length).toEqual(MOCKED_STACKS_SIZE);
        expect(reservationState.selected.size).toEqual(2);
        expect(reservationState.selected.has(selected[1])).toBe(true);
        expect(reservationState.selected.has(selected[3])).toBe(true);
    });

    it('should push stored selected items to reservation', () => {
        let selected: ItemStack[] = [];
        selected.push(reservationState.stacks[0]);
        selected.push(reservationState.stacks[2]);
        selected[0].selectedCount = 1;
        selected[1].selectedCount = 2;

        reservationState.select(selected);
        reservationState.pushSelectedToReservation();

        expect(reservationState.stacks.length).toEqual(MOCKED_STACKS_SIZE);
        expect(reservationState.selected.size).toEqual(0);
        expect(reservationState.addedCount).toEqual(3);
        expect(reservationState.added.length).toEqual(3);
        expect(reservationState.added[0]).toBe(Array.from(selected[0].items)[0]);
        expect(reservationState.added[1]).toBe(Array.from(selected[1].items)[0]);
        expect(reservationState.added[2]).toBe(Array.from(selected[1].items)[1]);
    });

    it('should block items when reservation ends after new begin', () => {
        MOCKED_RESERVATIONS[0].begin = new Date(NOW - ONE_DAY);
        MOCKED_RESERVATIONS[0].end = new Date(NOW + ONE_DAY);
        MOCKED_RESERVATIONS[0].items = [
            /*stack0 > 2 items*/items[0], items[1],
            /*stack1* > 1 item*/items[6],
            /*stack5* > all (5) items*/items[20], items[21], items[22], items[23]
        ];
        reservationState.reservation.begin = new Date(NOW);
        // reservationState.reservation.end = new Date(NOW + ONE_DAY);

        expect(reservationState.stacks[0].blockedCount).toEqual(2);
        expect(reservationState.stacks[0].blocked).toBe(false);
        expect(reservationState.stacks[1].blockedCount).toEqual(1);
        expect(reservationState.stacks[1].blocked).toBe(false);
        expect(reservationState.stacks[2].blockedCount).toEqual(0);
        expect(reservationState.stacks[3].blockedCount).toEqual(0);
        expect(reservationState.stacks[4].blockedCount).toEqual(0);
        expect(reservationState.stacks[5].blockedCount).toEqual(4);
        expect(reservationState.stacks[5].blocked).toBe(true);
    });

});
