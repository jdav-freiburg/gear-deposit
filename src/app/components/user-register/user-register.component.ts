import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser, RegisteredUser } from '../../model';
import { AuthService, UserService } from '../../services';

@Component({
    selector: 'jgd-user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

    submitted = false;
    user: RegisteredUser;

    private uid: string;

    constructor(private authService: AuthService,
                private userService: UserService,
                private router: Router) {
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
