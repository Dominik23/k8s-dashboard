import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { EChartsOption } from 'echarts';
import { K8sService } from '../services/k8s.service';

@Component({
  selector: 'app-chart-bottomsheet',
  templateUrl: './chart-bottomsheet.component.html',
  styleUrls: ['./chart-bottomsheet.component.scss']
})
export class ChartBottomsheetComponent implements OnInit {
  chartOption: EChartsOption = {
  };
  constructor(public k8sService: K8sService) { }

  ngOnInit(): void {
    
      this.k8sService.time.subscribe((data: any) => {
        this.chartOption = {
          xAxis: {
            type: 'category',
            data: data.time
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: data.pods,
              type: 'line',
            },
          ],
        }
      });
  }

}
