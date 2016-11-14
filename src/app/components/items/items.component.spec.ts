/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsComponent } from './items.component';

describe('EditItemsComponent', () => {
    let component: ItemsComponent;
    let fixture: ComponentFixture<ItemsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
