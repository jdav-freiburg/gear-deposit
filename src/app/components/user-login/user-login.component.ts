import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services';

@Component({
    selector: 'jgd-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {

    isFormVisible = false;

    constructor(private authService: AuthService) {
    }

    showForm() {
        this.isFormVisible = true;
    }

    loginGoogle(): void {
        this.authService.loginGoogle();
    }

    onSubmit(event: Event, form: NgForm): void {
        event.preventDefault();
        this.authService.loginPW(form.value.email, form.value.password).catch((e: Error) => {
            console.error('couldn\'t login with email/pw', form.value.email, form.value.password, e);
            alert(e);
        });
    }

}
