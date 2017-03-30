import { Component, OnInit } from '@angular/core';
import { RegisteredUser, UiMessage, UiMessageType } from '../../model';
import { UiMessageService, UserService } from '../../services';

@Component({
    selector: 'jgd-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    messages: any = {
        unconfirmedWarning: <UiMessage>{
            message: 'Du bist noch nicht freigeschaltet.',
            type: UiMessageType.WARNING
        },
        unconfirmedInfo: <UiMessage>{
            message: 'Erinnere Deinen Gruppenleiter oder das Jugendreferat daran Dich freizuschalten.',
            type: UiMessageType.INFO
        }
    };

    registeredUser: RegisteredUser;

    unconfirmedUsers: Set<RegisteredUser>;

    constructor(private userService: UserService, private uiMessages: UiMessageService) {
    }

    ngOnInit(): void {
        this.userService.getRegisteredUser$().subscribe((registeredUser: RegisteredUser) => {
            this.registeredUser = registeredUser;

            if (registeredUser.confirmed) {
                this.userService.getUnconfirmedUsers$().subscribe(unconfirmed => this.unconfirmedUsers = unconfirmed);
            }
        });
    }

    confirmUser(user: RegisteredUser): void {
        console.debug('#confirmUser();');
        this.userService.confirmUser(user.uid)
            .then(() => {
                this.unconfirmedUsers.delete(user);
                this.uiMessages.emitInfo(`Danke! ${user.name} kann das Depot jetzt benutzen.`);
            });
    }
}
