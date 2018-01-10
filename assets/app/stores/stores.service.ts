import { Store } from "./store.model";
import { Http } from "@angular/http";

import 'rxjs/Rx';
import { Injectable } from "@angular/core";

@Injectable()
export class StoresService {
    stores: Store[] = [];
    constructor(public http: Http) { }

    getStores() {
        return this.http.get('http://localhost:3000')
        .map()
    }
}