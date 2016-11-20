import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EditItemsComponent } from './edit-items.component';
import { FooterComponent } from '../../../footer/footer.component';
import { NavBarComponent } from '../../../nav-bar/nav-bar.component';
import { ItemService, UiMessageService } from '../../../../services';
import { ItemFilterPipe } from '../../../../pipes';
import { createItemServiceFake } from '../../../../../testing';

describe('EditItemsComponent', () => {

    let component: EditItemsComponent;
    let fixture: ComponentFixture<EditItemsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                EditItemsComponent,
                FooterComponent,
                NavBarComponent,
                ItemFilterPipe
            ],
            providers: [
                {provide: ItemService, useValue: createItemServiceFake()},
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
