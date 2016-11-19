import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsComponent } from './items.component';
import { ItemFilterPipe } from '../../pipes';
import { createMockItem } from '../../../test-helpers';
import { ItemComponent } from './item.component';

describe('ItemsComponent', () => {
    let component: ItemsComponent;
    let fixture: ComponentFixture<ItemsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ItemsComponent,
                ItemComponent
            ],
            providers: [ItemFilterPipe]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsComponent);
        component = fixture.componentInstance;
        component.items = [
            createMockItem(1),
            createMockItem(2)
        ];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
