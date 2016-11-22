import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleableReservedItemListComponent } from './toggleable-reserved-item-list.component';

describe('ToggleableReservedItemListComponent', () => {
    let component: ToggleableReservedItemListComponent;
    let fixture: ComponentFixture<ToggleableReservedItemListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ToggleableReservedItemListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToggleableReservedItemListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
