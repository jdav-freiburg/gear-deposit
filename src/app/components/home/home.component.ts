import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RegisteredUser } from '../../model/user';

@Component({
    selector: 'jgd-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    private registeredUser: RegisteredUser

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.getRegisteredUser$().subscribe((registeredUser: RegisteredUser) => {
            this.registeredUser = registeredUser;
        });
    }
}
