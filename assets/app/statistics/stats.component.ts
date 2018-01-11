import {Component} from '@angular/core';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.css']
})
export class StatsComponent {
    public pieChartLabels:string[] = ['Meat', 'Milk', 'Sea food'];
    public pieChartData:number[] = [300, 500, 100];
    public pieChartType:string = 'pie';

    // events
    public chartClicked(e:any):void {

    }

    public chartHovered(e:any):void {

    }
}
