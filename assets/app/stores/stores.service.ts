import { Store } from "./store.model";
import { Http } from "@angular/http";

import 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { Response } from "@angular/http/";
@Injectable()
export class StoresService {
    stores: Store[] = [];
    constructor(public http: Http) { }

    getStores() {
        return this.http.get('http://localhost:3000/stores')
            .map((response: Response) => {
                const stores = response.json().obj;
                let transformedStrores: Store[] = [];
                for (var store in stores) {
                    transformedStrores.push(new Store(
                        stores[store].name,
                        stores[store].city,
                        stores[store].lon,
                        stores[store].lat,
                    ));
                }
                return transformedStrores;
            });
    }
}