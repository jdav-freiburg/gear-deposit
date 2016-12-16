import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'jgd-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    private isFormVisible: boolean = false;

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
