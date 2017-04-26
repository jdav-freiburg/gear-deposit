import { Location } from '@angular/common';
import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Reservation } from '../../../../model';
import { LoadingService, ReservationService, UiMessageService } from '../../../../services';
import { ReservationStateService } from '../../services/reservation-state.service';

const TODAY = new Date();

export namespace CustomValidators {

    export function dateNotInThePast(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors => {
            const date: Date = new Date(control.value);
            return date <= TODAY ? {dateInThePast: {date}} : null;
        };
    }

}

@Component({
    selector: 'jgd-new-reservation',
    templateUrl: './new-reservation.component.html',
    styleUrls: ['./new-reservation.component.scss'],
    providers: [ReservationStateService]
})
export class NewReservationComponent implements OnInit, AfterContentInit {

    @ViewChild('nameInput') nameInput: ElementRef;

    reservationForm: FormGroup;

    formErrors = {
        name: '',
        begin: '',
        end: '',
        items: ''
    };

    validationMessages = {
        name: {
            required: 'Name der Reservierung fehlt.',
            minlength: 'Name muss mindestens 10 Zeichen lang sein.',
        },
        begin: {
            required: 'Beginn der Reservierung fehlt.',
            dateInThePast: 'Beginn der Reservierung darf nicht in der Vergangenheit liegen.',
        },
        end: {
            required: 'Ende der Reservierung fehlt.',
            dateInThePast: 'Ende der Reservierung darf nicht in der Vergangenheit liegen.',
            dateLowerThanBegin: 'Beginn der Reservierung muss vor dem Ende liegen.'
        }
    };

    filterQuery: string;

    constructor(private formBuilder: FormBuilder,
                private location: Location,
                private router: Router,
                private reservationService: ReservationService,
                private reservationState: ReservationStateService,
                private uiMessage: UiMessageService,
                private loadingService: LoadingService) {
    }

    ngOnInit() {
        this.reservationForm = this.formBuilder.group({
            name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(10)
                ]
            ],
            begin: [
                '',
                [
                    Validators.required,
                    CustomValidators.dateNotInThePast()
                ]
            ],
            end: [
                '',
                [
                    Validators.required,
                    CustomValidators.dateNotInThePast(),
                    this.dateGreaterThanBegin()
                ]
            ]
        });

        this.loadingService.emitLoading(true);
        this.reservationState.initialized.subscribe(() => {
            this.loadingService.emitLoading(false);
        });
    }

    ngAfterContentInit(): void {
        this.nameInput.nativeElement.focus();
        this.reservationForm.valueChanges.subscribe((value: any) => {
            if (value.begin) {
                this.reservationState.reservation.begin = value.begin;
            }
            if (value.end) {
                this.reservationState.reservation.end = value.end;
            }
        });
    }

    get reservation(): Reservation {
        return this.reservationState.reservation;
    }

    onFilterChanged(filterQuery: string) {
        this.filterQuery = filterQuery;
    }

    // needs to be here; otherwise we can't access the current begin value
    dateGreaterThanBegin(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors => {
            const date: Date = new Date(control.value);
            const begin: Date = this.reservationForm ? new Date(this.reservationForm.value.begin) : undefined;
            return date <= begin ? {dateLowerThanBegin: {date, begin}} : null;
        };
    }

    moveFocus(el: any, event: KeyboardEvent) {
        event.preventDefault();
        el.focus();
    }

    cancel() {
        if (this.reservationForm.dirty) {
            alert('changed!?');
        }

        this.location.back();
    }

    saveReservation() {
        if (!this.validated()) {
            alert(JSON.stringify(this.formErrors));
            return;
        }

        const formModel = this.reservationForm.value;

        const reservation: Reservation = {
            user: this.reservationState.reservation.user,
            name: formModel.name,
            begin: new Date(formModel.begin),
            end: new Date(formModel.end),
            items: this.reservationState.added
        };

        console.log('#saveReservation();', reservation);
        console.time('#saveReservation();');
        this.reservationService.add(reservation)
            .then(() => {
                this.router.navigateByUrl(`/reservations`);
                this.uiMessage.emitInfo('Reservierung gespeichert');
                console.info('#saveReservation(); done');
                console.timeEnd('#saveReservation();');
            })
            .catch((err: any) => {
                console.error('#saveReservation(); got error while saving', err);
                this.uiMessage.emitError('Unbekannter Fehler - Reservierung nicht gespeichert');
                console.timeEnd('#saveReservation();');
            });
    }

    private validated(): boolean {
        let valid = true;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = this.reservationForm.get(field);

            // items can be picked too, but that is not a control ...
            if (control) {
                control.updateValueAndValidity({
                    onlySelf: true,
                    emitEvent: false
                });
            }

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                    valid = false;
                }
            }
        }

        if (this.reservationState.added.length === 0) {
            this.formErrors.items = 'Du hast keine Gegenstände ausgewählt.';
            valid = false;
        }

        return valid;
    }

}
