import {Component, OnInit, ViewChild} from '@angular/core';
import {StoresService} from '../stores/stores.service';
import {Subscription} from "rxjs/Subscription";
import {StoreGroup} from "../stores/storeGroupBy.model";
import {BaseChartDirective} from "ng2-charts";

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit{


    //Pie params
    public pieChartLabels:string[] = ['Meat', 'Milk', 'Sea food'];
    public pieChartData:number[] = [300, 500, 100];
    public pieChartType:string = 'pie';
    public stores: StoreGroup[];
    public storeSubscribe: Subscription;

    //Graph params
    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    public barChartLabels:string[] =  ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = false

    public barChartData:any[] = [
        {   label: 'Cities count',
            data: [1]}
    ];


    ngOnInit(): void {
       this.storeSubscribe = this.storesService.getStoresGroupedByCity().subscribe(
           (object) => {
               this.barChartData = [{
                   label: "# of Votes",
                   data: object.count
               }];


               setTimeout(() => {
                   this.barChartLabels = object.storesNames;

                   if (this.chart && this.chart.chart && this.chart.chart.config) {
                       this.chart.chart.config.data.labels = this.barChartLabels;
                       this.chart.chart.update();
                   }
               });
           }
       );
    }
    // events
    public chartClicked(e:any):void {

    }

    public chartHovered(e:any):void {

    }

    constructor(public storesService: StoresService) {}
}
