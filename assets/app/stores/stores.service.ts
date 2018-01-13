import { Store } from "./store.model";
import { Http } from "@angular/http";

import 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { Response } from "@angular/http/";
import {StoreGroup} from "./storeGroupBy.model";
@Injectable()
export class StoresService {
    stores: Store[] = [];
    constructor(public http: Http) { }

    getStores() {
        return this.http.get('http://localhost:3000/storeslist')
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
    getStoresGroupedByCity() {
        return this.http.get('http://localhost:3000/storeslist/group')
            .map((response: Response) => {
                const stores = response.json().obj;
                let transformedStrores: StoreGroup[] = [];
                let count: number[] = [];
                let data: string[] = [];
                for (var store in stores) {
                    transformedStrores.push(new StoreGroup(
                        stores[store]._id,
                        stores[store].count
                    ));
                    count.push(stores[store].count);
                    data.push(stores[store]._id);
                }
                return {storesNames: data, count: count, StoreGroup: transformedStrores} ;
            });
    }


}