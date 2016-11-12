import { TestBed, inject } from '@angular/core/testing';
import { ItemsComponent } from './items.component';

describe('ItemsComponent', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ItemsComponent
            ]
        });
    });

    it('should be defined', inject([ItemsComponent], (homeComponent: ItemsComponent) => {
        expect(homeComponent).toBeDefined();
    }));

});
