import { AuthUser, Item, RegisteredUser, Reservation, UserAuthStatus } from '../app/model/';

export const MOCKED_AUTH_USER = <AuthUser>{
    uid: 'test-id',
    providerId: 'test-provider',
    email: 'test@gmail.com',
    displayName: 'test-user-name'
};

export const MOCKED_REGISTERED_USER = <RegisteredUser>{
    uid: MOCKED_AUTH_USER.uid,
    name: MOCKED_AUTH_USER.displayName,
    email: MOCKED_AUTH_USER.email,
    youthGroup: 'test-youthGroup'
};

export const MOCKED_USER_AUTH_STATUS = <UserAuthStatus>{
    isAuthorized: true,
    isRegistered: true,
    hasAdminRole: true
};

export function createMockItem(id: number): Item {
    return new Item(
        `${id}`,
        'test-item-type',
        'test-item-description',
        'ok',
        []
    );
}

export function createMockReservation(id: number): Reservation {
    return <Reservation>{
        id: `${id}`,
        user: MOCKED_REGISTERED_USER,
        name: `test-reservation-${id}`,
        begin: new Date(Date.now()),
        end: new Date(Date.now() + 1000000),
        items: [
            createMockItem(1),
            createMockItem(2)
        ]
    };
}

export const MOCKED_RESERVATIONS: Set<Reservation> = new Set<Reservation>([
    createMockReservation(1),
    createMockReservation(2)
]);
