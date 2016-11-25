import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleItemListComponent } from './simple-item-list.component';

describe('SimpleItemListComponent', () => {
    let component: SimpleItemListComponent;
    let fixture: ComponentFixture<SimpleItemListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SimpleItemListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SimpleItemListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
