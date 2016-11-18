import {
    MOCKED_AUTH_USER,
    MOCKED_RESERVATIONS,
    MOCKED_REGISTERED_USER,
    MOCKED_USER_AUTH_STATUS,
    createMockItem
} from './mocks';
import { Observable } from 'rxjs/Observable';
import { Item, Reservation } from '../app/model';

export function createAuthServiceSpy() {
    let authService = {
        getAuthUser: () => {
        }
    };
    spyOn(authService, 'getAuthUser').and.returnValue(Observable.from([MOCKED_AUTH_USER]));
    return authService;
};

export function createUserServiceSpy() {
    let userService = {
        reset: () => {
        },
        isRegistered: () => {
        },
        getRegisteredUser: () => {
        },
        registerUser: () => {
        }
    };
    spyOn(userService, 'getRegisteredUser').and.returnValue(Observable.from([MOCKED_REGISTERED_USER]));
    return userService;
}

export function createUserAuthStatusServiceSpy() {
    let userAuthStatusService = {
        getUserAuthStatus: {},
        reset: {}
    };
    spyOn(userAuthStatusService, 'getUserAuthStatus').and.returnValue(Observable.from([MOCKED_USER_AUTH_STATUS]));
    return userAuthStatusService;
}

export function createItemServiceSpy() {
    let itemService = {
        items: () => {
            return Observable.from([
                createMockItem(1),
                createMockItem(2)
            ]);
        },
        types: () => {
        },
        update: (id: string, item: Item) => {
        }
    };
    spyOn(itemService, 'items').and.callThrough();
    return itemService;
}

export function createReservationServiceSpy() {
    let reservationService = {
        add: (reservation: Reservation) => {
        },
        all: () => {
        },
        get: (id: string) => {
        },
        remove: (id: string) => {
        }
    };
    spyOn(reservationService, 'all').and.returnValue(Observable.from([MOCKED_RESERVATIONS]));
    return reservationService;
};
