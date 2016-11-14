import { TestBed, inject } from '@angular/core/testing';
import { EditItemsComponent } from './edit-items.component';

describe('EditItemsComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                EditItemsComponent
            ]
        });
    });

    it('should be defined', inject([EditItemsComponent], (homeComponent: EditItemsComponent) => {
        expect(homeComponent).toBeDefined();
    }));

});
