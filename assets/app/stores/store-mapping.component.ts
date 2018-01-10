import { Component, OnInit } from '@angular/core';
import { StoresService } from './stores.service';


@Component({
    selector: 'app-store-mapping',
    templateUrl: './store-mapping.component.html',
    //styleUrls: ['./store-mapping.component.css']
})
export class StoreMappingComponent implements OnInit {
    constructor(public storesService:StoresService ) { }

    ngOnInit() { }
}