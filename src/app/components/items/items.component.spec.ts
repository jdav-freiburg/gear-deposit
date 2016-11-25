import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsComponent } from './items.component';
import { ItemFilterPipe } from '../../pipes';
import { createMockItem } from '../../../testing';
import { ItemStackComponent } from './item-stack/item-stack.component';

describe('ItemsComponent', () => {
    let component: ItemsComponent;
    let fixture: ComponentFixture<ItemsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ItemsComponent,
                ItemStackComponent
            ],
            providers: [ItemFilterPipe]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemsComponent);
        component = fixture.componentInstance;
        component.items = new Set([
            createMockItem(1),
            createMockItem(2)
        ]);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
