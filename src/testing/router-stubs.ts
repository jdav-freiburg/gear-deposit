/* tslint:disable:directive-selector component-selector use-host-property-decorator no-input-rename */
/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
// export for convenience.
import { Component, Directive, Injectable, Input } from '@angular/core';
import {
    ActivatedRoute,
    Event,
    NavigationExtras,
    NavigationStart,
    Router,
    RouterState,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree
} from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs/Rx';

@Directive({
    selector: '[routerLink]',
    host: {
        '(click)': 'onClick()'
    }
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent {
}

@Injectable()
export class RouterStub {

    _events: Subject<Event> = new BehaviorSubject<Event>(new NavigationStart(1, '/'));

    _url: string;

    navigate(commands: any[], extras?: NavigationExtras) {
    }

    navigateByUrl(url: string | UrlTree, extras?: NavigationExtras) {
    }

    get routerState() {
        return {
            snapshot: {
                url: this._url ? this._url : window.location.pathname + window.location.search + window.location.hash
            } as RouterStateSnapshot
        } as RouterState;
    }

    get events() {
        return this._events.asObservable();
    }
}

export class ActivatedRouteStubBase {

    snapshot = new ActivatedRouteSnapshotStub();

    url: UrlSegment[] = [
        new UrlSegment('/', {})
    ];

    private subjectParams = new BehaviorSubject(this.testParams);
    private subjectQueryParams = new BehaviorSubject(this.testQueryParams);
    private subjectData = new BehaviorSubject(this.testData);

    params = this.subjectParams.asObservable();
    queryParams = this.subjectQueryParams.asObservable();
    data = this.subjectData.asObservable();

    private _testParams: {};
    private _testQueryParams: {};
    private _testData: {};

    constructor() {
        this.testParams = {};
        this.testQueryParams = {};
        this.testData = {};
    }

    get testParams() {
        return this._testParams;
    }

    set testParams(params: {}) {
        this._testParams = params;
        this.subjectParams.next(params);
    }

    get testQueryParams() {
        return this._testQueryParams;
    }

    set testQueryParams(queryParams: {}) {
        this._testQueryParams = queryParams;
        this.subjectQueryParams.next(queryParams);
    }

    get testData() {
        return this._testData;
    }

    set testData(data: {}) {
        this._testData = data;
        this.subjectData.next(data);
    }

}

@Injectable()
export class ActivatedRouteStub extends ActivatedRouteStubBase {
    parent = new ActivatedRouteStubBase();
}

export class ActivatedRouteSnapshotStubBase {
    url: UrlSegment[] = [
        new UrlSegment('/', {})
    ];
}

@Injectable()
export class ActivatedRouteSnapshotStub extends ActivatedRouteSnapshotStubBase {
    parent = new ActivatedRouteSnapshotStubBase();
}

export const ROUTER_STUB = {provide: Router, useClass: RouterStub};

export const ACTIVATED_ROUTE_STUB = {provide: ActivatedRoute, useClass: ActivatedRouteStub};
