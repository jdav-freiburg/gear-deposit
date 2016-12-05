import { UserService } from './';
import { createAngularFireFake, createAuthServiceFake, createUiMessageServiceFake } from '../../testing/fakes';

describe('Service: UserService', () => {

    let service: UserService;

    beforeEach(() => {
        service = new UserService(
            createAngularFireFake(),
            createAuthServiceFake(),
            createUiMessageServiceFake());
    });

    it('should ...', () => {
        expect(service).toBeTruthy();
    });

});
