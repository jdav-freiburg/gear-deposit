import { UserAuthStatusService } from './user-auth-status.service';
import { createUserServiceFake, createAuthServiceFake } from '../../testing/fakes';

describe('Service: UserAuthStatusService', () => {

    let service: UserAuthStatusService;

    beforeEach(() => {
        service = new UserAuthStatusService(
            createAuthServiceFake(),
            createUserServiceFake()
        );
    });

    it('should ...', () => {
        expect(service).toBeTruthy();
    });

});
