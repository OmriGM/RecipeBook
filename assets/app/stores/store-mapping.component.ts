import { StoresService } from './stores.service';
import { ElementRef, NgZone, OnInit, ViewChild, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { Store } from './store.model';


@Component({
    selector: 'app-store-mapping',
    styles: [`
    agm-map {
      height: 300px;
    }
  `],
    templateUrl: './store-mapping.component.html',

})
export class StoreMappingComponent implements OnInit {

    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;
    markers: marker[] = [];

    @ViewChild("search")
    public searchElementRef: ElementRef;

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

        //set current position
        this.setCurrentPosition();

        this.initMarkers();

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

    initMarkers() {
        this.storesService.getStores().subscribe(
            (stores: Store[]) => {
                for (var store in stores) {
                    console.log("lat:" + stores[store].lat);
                    this.markers.push({ lat: stores[store].lon, lng: stores[store].lat, name: stores[store].name });
                }
            }
        )
    }

}

interface marker {
    lat: number;
    lng: number;
    name: string;
}
