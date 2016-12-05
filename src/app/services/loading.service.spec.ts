import { LoadingService } from './loading.service';

describe('Service: LoadingService', () => {
    let service: LoadingService;

    beforeEach(() => {
        service = new LoadingService();
    });

    it('should emit loading (true)', () => {
        let loading: boolean;
        service.loading.subscribe((l: boolean) => {
            loading = l;
        });
        service.emitLoading(true);
        expect(loading).toEqual(true);
    });

    it('should emit loading (false)', () => {
        let loading: boolean;
        service.loading.subscribe((l: boolean) => {
            loading = l;
        });
        service.emitLoading(false);
        expect(loading).toEqual(false);
    });

});
