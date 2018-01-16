import { StoresService } from './stores.service';
import { ElementRef, NgZone, OnInit, ViewChild, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { Store } from './store.model';
import * as geolib from 'geolib';
import { Output } from '@angular/core';


@Component({
    selector: 'app-store-mapping',
    styles: [`
    agm-map {
      height: 500px;
    }
  `],
    templateUrl: './store-mapping.component.html',

})
export class StoreMappingComponent implements OnInit {
    public bestStore: string;
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;
    markers: marker[] = [];
    stores:Store[]=[];
    currStore:Store;

    @ViewChild("search")
    public searchElementRef: ElementRef;
    min: number;

    constructor(
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        public storesService: StoresService
    ) { }



    ngOnInit() {
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        //create search FormControl
        this.searchControl = new FormControl();

        
        this.initMarkers();
        //set current position
        this.setCurrentPosition();




        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                    this.initDistanceses(this.stores);
                });
            });
        });
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }

    getClosestStoreName(stores:Store[]) {
        this.min=stores[0].distance;
        for (var i in stores) {
            if (stores[i].distance < this.min) {
                this.bestStore = stores[i].name;
                this.min = stores[i].distance;
            }
        }        
        this.storesService.bestStore=this.bestStore;
    }
    
    initMarkers() {
        this.storesService.getStores().subscribe(
            (stores: Store[]) => {
                for (var i in stores) {
                    this.markers.push({ lat: stores[i].lon, lng: stores[i].lat, name: stores[i].name });    
                    this.currStore=new Store(stores[i].name,stores[i].city,stores[i].lat,stores[i].lon);
                    this.stores.push(this.currStore);  
                }                
            }
        )
    }
    initDistanceses(stores:Store[]){
        for (var i in stores) {
            stores[i].distance = geolib.getDistance(
                { latitude: this.longitude, longitude: this.latitude },
                { latitude: stores[i].lat, longitude: stores[i].lon });
            //stores[i].distance = stores[i].distance / 1000;
        }
        this.stores=stores;
        this.getClosestStoreName(this.stores);
    }
}

interface marker {
    lat: number;
    lng: number;
    name: string;
}
