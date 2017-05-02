import { AbstractControl } from '@angular/forms';
import { ONE_DAY, Utils } from '../../../../../testing';
import { CustomValidators } from './new-reservation.component';

describe('CustomValidators', () => {

    let control: AbstractControl;

    beforeEach(() => {
        control = {value: null} as AbstractControl;
    });

    it('should validate `Date.now()`', () => {
        (control as any).value = Utils.formatDate(new Date());
        const validationError = CustomValidators.dateNotInThePast()(control);
        expect(validationError).toBeNull();
    });

    it('shouldn\'t validate yesterday ', () => {
        const yesterday = new Date(Date.now() - ONE_DAY);
        (control as any).value = Utils.formatDate(yesterday);
        yesterday.setHours(0, 0, 0, 0);
        const validationError = CustomValidators.dateNotInThePast()(control);
        expect(validationError).toBeDefined();
        expect(validationError.dateInThePast).toBeDefined();
        expect(validationError.dateInThePast).toEqual({date: yesterday});
    });

});