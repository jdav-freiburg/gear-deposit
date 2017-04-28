import { AuthUser, Item, RegisteredUser, Reservation, UserAuthStatus } from '../app/model/';

export const ONE_DAY = 24 * 60 * 60 * 1000;

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

export const MOCK_ITEM_TYPE = 'test-item-type';
export const MOCK_ITEM_DESCRIPTION = 'test-item-description';
export const MOCK_ITEM_SHAPE = 'ok';
export const MOCK_ITEM_LABELS = [
    'test-item-label1',
    'test-item-label2'
];
export function createMockItem(id?: number): Item {
    return new Item(
        `${id ? id : Math.random()}`,
        MOCK_ITEM_TYPE,
        MOCK_ITEM_DESCRIPTION,
        MOCK_ITEM_SHAPE,
        MOCK_ITEM_LABELS
    );
}

export function createMockItems(count: number): Item[] {
    const items: Item[] = [];
    let i = count;
    while (i > 0) {
        i--;
        items.push(createMockItem());
    }
    return items;
}

/**
 * Creates a list with in total `stackSize` * `stackItemSize` items.
 * The list will contain "stacks" of items, each "stack" has equal `item.description` and `item.type`.
 * The list will contain in total `stackSize` "stacks" and each "stack" consists of `stackItemSize` items.
 */
export function createComplexMockItems(stackSize: number, stackItemSize: number): Item[] {
    let items: Item[] = [];
    let stackItems: Item[] = [];
    let i = 0;
    while (i < stackSize) {
        stackItems = createMockItems(stackItemSize);
        stackItems.forEach((item) => {
            item.description = `${item.description}_stack${i + 1}`;
            item.type = `${item.type}_stack${i + 1}`;
        });
        items = items.concat(stackItems);
        i++;
    }
    return items;
};

export function createMockReservation(id: number): Reservation {
    return <Reservation>{
        id: `${id}`,
        user: MOCKED_REGISTERED_USER,
        name: `test-reservation-${id}`,
        begin: new Date(Date.now() + id * ONE_DAY),
        end: new Date(Date.now() + id * 2 * ONE_DAY),
        items: [
            createMockItem(1),
            createMockItem(2)
        ]
    };
}

export const MOCKED_RESERVATIONS: Reservation[] = [
    createMockReservation(1),
    createMockReservation(2),
    createMockReservation(3)
];
