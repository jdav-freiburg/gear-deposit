import { Location } from '@angular/common';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ChangedWarningDialog } from '../../../../dialogs/changed-warning';
import { ItemStack, Reservation } from '../../../../model';
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

    form: FormGroup;

    formErrors = {
        name: '',
        begin: '',
        end: '',
        items: ''
    };

    validationMessages = {
        name: {
            required: 'Der Name Deiner Ausfahrt fehlt.',
            minlength: 'Der Name Deiner Ausfahrt sollte mindestens 5 Zeichen lang sein.',
        },
        begin: {
            required: 'Du hast kein Reservierungs-Beginn ausgewählt.',
            dateInThePast: 'Der Beginn der Reservierung darf nicht in der Vergangenheit liegen.',
        },
        end: {
            required: 'Du hast kein Reservierungs-Ende ausgewählt.',
            dateInThePast: 'Das Ende der Reservierung darf nicht in der Vergangenheit liegen.',
            dateLowerThanBegin: 'Das Ende der Reservierung darf nicht vor dem Beginn liegen.'
        }
    };

    stacks: ItemStack[];

    filterQuery: string;

    isValid = false;

    constructor(private dialog: MdDialog,
                private formBuilder: FormBuilder,
                private location: Location,
                private router: Router,
                private reservationService: ReservationService,
                private reservationState: ReservationStateService,
                private uiMessage: UiMessageService,
                private loadingService: LoadingService) {
    }

    ngOnInit() {
        this.loadingService.emitLoading(true);

        this.reservationState.initialized.subscribe(() => {
            this.stacks = this.reservationState.stacks;
            this.loadingService.emitLoading(false);
        });

        this.reservationState.blockedChange.subscribe(() => {
            this.stacks = this.reservationState.stacks;
        });

        this.form = this.formBuilder.group({
            name: [
                '',
                [
                    Validators.required,
                    Validators.minLength(5)
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
    }

    ngAfterContentInit(): void {
        this.form.valueChanges.subscribe((value: any) => {
            if (value.begin && this.reservationState.reservation.begin !== value.begin) {
                this.reservationState.reservation.begin = value.begin;
                // FIXME
                // this.onFilterChanged(this.filterQuery);
            }

            if (value.end && this.reservationState.reservation.end !== value.end) {
                this.reservationState.reservation.end = value.end;
                // FIXME
                // this.onFilterChanged(this.filterQuery);
            }

            if (this.form.dirty) {
                this.validate();
            }
        });
    }

    get reservation(): Reservation {
        return this.reservationState.reservation;
    }

    onFilterChanged(filterQuery: string) {
        // FIXME blocked status gets lost ...
        console.debug('#ngOnChanges(); > ', filterQuery);
        this.filterQuery = filterQuery;
        this.stacks = this.reservationState.filter(filterQuery);
    }

    // needs to be here; otherwise we can't access the current begin value
    dateGreaterThanBegin(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors => {
            const date: Date = new Date(control.value);
            const begin: Date = this.form ? new Date(this.form.value.begin) : undefined;
            return date <= begin ? {dateLowerThanBegin: {date, begin}} : null;
        };
    }

    cancel() {
        if (this.form.dirty) {
            const dialogRef = this.dialog.open(ChangedWarningDialog);
            dialogRef.afterClosed().subscribe(cancelApproved => {
                if (cancelApproved) {
                    this.location.back();
                }
            });
        } else {
            this.location.back();
        }
    }

    onSubmit() {
        this.validate();
        if (this.isValid) {
            this.saveReservation();
        }
    }

    saveReservation() {
        const formModel = this.form.value;

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

    private validate() {
        let valid = true;
        Object.keys(this.formErrors).forEach(key => {

            // clear previous error message (if any)
            this.formErrors[key] = '';
            const control = this.form.get(key);

            // `items` is present in `formErrors` too but that in `form` as it isn't a control ...
            if (control) {
                control.updateValueAndValidity({
                    onlySelf: true,
                    emitEvent: false
                });
            }

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[key];
                Object.keys(control.errors).forEach(errorKey => {
                    this.formErrors[key] += messages[errorKey] + ' ';
                    valid = false;
                });
            }
        });

        // FIXME added isn't correct / stacks in reservationState have not correct selected state
        if (this.reservationState.added.length === 0) {
            this.formErrors.items = 'Du hast keine Gegenstände ausgewählt.';
            valid = false;
        }

        this.isValid = valid;
    }

}
