import { NgModule } from '@angular/core';
import { CommonModule as AngularCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '../../common.module';
import { ReservationService } from '../../services';
import { ReservationsComponent } from './reservations.component';
import { NewReservationComponent } from './new/new-reservation.component';
import { EditReservationComponent } from './edit/edit-reservation.component';
import { ToggleableReservedItemListComponent } from './toggleable-reserved-item-list/toggleable-reserved-item-list.component';

@NgModule({
    imports: [
        AngularCommonModule,
        FormsModule,
        CommonModule
    ],
    declarations: [
        ReservationsComponent,
        NewReservationComponent,
        EditReservationComponent,
        ToggleableReservedItemListComponent
    ],
    providers: [
        ReservationService
    ],
    exports: [
        ReservationsComponent,
        NewReservationComponent,
        EditReservationComponent,
    ]
})
export class ReservationModule {
}
