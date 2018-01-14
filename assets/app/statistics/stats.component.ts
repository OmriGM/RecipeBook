import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StoresService} from '../stores/stores.service';
import {Subscription} from "rxjs/Subscription";
import {StoreGroup} from "../stores/storeGroupBy.model";
import {BaseChartDirective} from "ng2-charts";
import {Recipe2Service} from "../shared/recipe2.service";

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit, OnDestroy{



    //Pie params
    public pieChartLabels:string[] = [];
    public pieChartData:number[] = [];
    public pieChartType:string = 'pie';
    public stores: StoreGroup[];
    public recipeSubscribe: Subscription;
    @ViewChild('pieChart') pieChart: BaseChartDirective;

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
    public storeSubscribe: Subscription;
    @ViewChild('barChart') barChart: BaseChartDirective;

    public barChartLabels:string[] =  [];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = false;

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

                   if (this.barChart && this.barChart.chart && this.barChart.chart.config) {
                       this.barChart.chart.config.data.labels = this.barChartLabels;
                       this.barChart.chart.update();
                   }
               });
           }
       );


        this.recipeSubscribe = this.recipeService.getGroupByCatagory().subscribe((object) => {

            this.pieChartData = object.counts;

            setTimeout(()=>
                {
                    this.pieChartLabels = object.names;
                    if (this.pieChart && this.pieChart.chart && this.pieChart.chart.config) {
                        this.pieChart.chart.config.data.labels = this.pieChartLabels;
                        this.pieChart.chart.update();
                    }
                }
            );
        });


    }


    ngOnDestroy(): void {
        this.recipeSubscribe.unsubscribe();
        this.storeSubscribe.unsubscribe();
    }


    // events
    public chartClicked(e:any):void {

    }

    public chartHovered(e:any):void {

    }

    constructor(public storesService: StoresService, public recipeService: Recipe2Service) {}
}
