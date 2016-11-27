import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemStackComponent } from './item-stack.component';
import { createMockItem } from '../../../.';
import { ItemStack } from '../../../model/item';

describe('ItemStackComponent', () => {
    let component: ItemStackComponent;
    let fixture: ComponentFixture<ItemStackComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemStackComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemStackComponent);
        component = fixture.componentInstance;
        component.itemStack = new ItemStack(createMockItem(1));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});