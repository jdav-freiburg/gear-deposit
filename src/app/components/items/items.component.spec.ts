import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsComponent } from './items.component';
import { ItemFilterPipe } from '../../pipes';

describe('EditItemsComponent', () => {
    let component: ItemsComponent;
    let fixture: ComponentFixture<ItemsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemsComponent],
            providers: [ItemFilterPipe]
        }).compileComponents();
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
