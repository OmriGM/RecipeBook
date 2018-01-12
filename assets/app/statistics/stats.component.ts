import {Component} from '@angular/core';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class StatsComponent {
    //Pie params
    public pieChartLabels:string[] = ['Meat', 'Milk', 'Sea food'];
    public pieChartData:number[] = [300, 500, 100];
    public pieChartType:string = 'pie';


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
    public barChartLabels:string[] = ['Rishon', 'Nes Ziona', 'TLV', 'Moshe', 'Ma?', 'ok', 'bye'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = false

    public barChartData:any[] = [
        {data: [2, 4, 2, 3, 5, 1, 2], label: 'Series A'}
    ];
    www = 0.1;

    // events
    public chartClicked(e:any):void {

    }

    public chartHovered(e:any):void {

    }
}
