import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '../../common.module';
import { ReservationService } from '../../services';
import { EditReservationComponent } from './components/edit-reservation/edit-reservation.component';
import { NewReservationComponent } from './components/new-reservation/new-reservation.component';
import { ReservationItemsComponent } from './components/reservation-items/reservation-items.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { ReservationStateService } from './services/reservation-state.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        ReservationsComponent,
        ReservationItemsComponent,
        NewReservationComponent,
        EditReservationComponent
    ],
    providers: [
        ReservationService,
        ReservationStateService
    ],
    exports: [
        ReservationsComponent,
        ReservationItemsComponent,
        NewReservationComponent,
        EditReservationComponent,
    ]
})
export class ReservationModule {
}
