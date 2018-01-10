import { StoresService } from './stores.service';
import { Component, OnInit, Injectable } from '@angular/core';

@Component({
    selector: 'app-store-list',
    templateUrl: './store-list.component.html',
    //styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

    constructor(public storesService:StoresService ) { }

    ngOnInit() { }
}