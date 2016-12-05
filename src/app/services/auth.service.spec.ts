import { AuthService } from './';
import { createAngularFireFake } from '../../testing/fakes';

describe('Service: AuthService', () => {

    let service: AuthService;

    beforeEach(() => {
        service = new AuthService(createAngularFireFake());
    });

    it('should ...', () => {
        expect(service).toBeTruthy();
    });

});
