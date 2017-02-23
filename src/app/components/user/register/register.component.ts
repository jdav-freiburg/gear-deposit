import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, UserService } from '../../../services';
import { RegisteredUser, AuthUser } from '../../../model';

@Component({
    selector: 'jgd-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    submitted = false;
    user: RegisteredUser;

    private uid: string;

    constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
        this.authService.getAuthUser$().subscribe((authUser: AuthUser) => {
            if (authUser !== undefined) {
                this.uid = authUser.uid;
                this.user = <RegisteredUser>{
                    name: authUser.displayName,
                    photoUrl: authUser.photoURL,
                    email: authUser.email
                };
            }
        });
    }

    onSubmit(event: Event): void {
        event.preventDefault();
        this.userService.registerUser(this.uid, this.user).then(() => {
            this.userService.reset();
            this.router.navigate(['/']);
        });

        this.submitted = true;
    }

}
