import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EditItemsComponent } from './edit-items.component';
import { ItemService, UiMessageService } from '../../../../services';
import { ItemFilterPipe } from '../../../../pipes';
import { createItemServiceSpy } from '../../../../../test-helpers';

describe('EditItemsComponent', () => {

    let component: EditItemsComponent;
    let fixture: ComponentFixture<EditItemsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                EditItemsComponent,
                ItemFilterPipe
            ],
            providers: [
                {provide: ItemService, useValue: createItemServiceSpy()},
                UiMessageService
            ],
            imports: [
                FormsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

});
