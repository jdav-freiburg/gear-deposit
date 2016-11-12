import { browser, element, by } from 'protractor';

export class GearDepositPage {
    navigateTo() {
        return browser.get('/');
    }

    getStartpageLink() {
        return element(by.css('header a[routerLink="/home"]'));
    }

}
