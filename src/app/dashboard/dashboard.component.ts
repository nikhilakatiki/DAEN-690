import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData,
  ILineChartOptions,
  Interpolation,
  getMultiValue
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataSource;
  displayedColumns: string[] = ['country', 'cases'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  data: IChartistData;
  data1: IChartistData;
  data2: IChartistData;

  type: ChartType = 'Line';
  options: ILineChartOptions = {
    axisX: {
      showGrid: false,
      showLabel: false,
    },
    lineSmooth: Interpolation.cardinal({
      tension: 0.2
    }),
    height: 300,
    showPoint: false,
    plugins: [
      ChartistTooltip({
        anchorToPoint: true,
        appendToBody: true
      })
    ]
  };;

  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'line') {
        data.element.attr({
          style: 'stroke: red'
        });
      }
    }
  };

  events1: ChartEvent = {
    draw: (data) => {
      if (data.type === 'line') {
        data.element.animate({
          y2: <IChartistAnimationOptions>{
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          }
        });
        data.element.attr({
          style: 'stroke: blue'
        });
      }
    }
  };

  events2: ChartEvent = {
    draw: (data) => {
      if (data.type === 'line') {
        data.element.animate({
          y2: <IChartistAnimationOptions>{
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          }
        });
        data.element.attr({
          style: 'stroke: green'
        });
      }
    }
  };

  country;
  countrySelect = new FormControl('');
  countriesData;
  worldMap;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getWorld().subscribe((data: any) => {
      let newData = data.filter(item => item.country != 'World')
      this.dataSource = new MatTableDataSource(newData);
      this.dataSource.sort = this.sort;
      console.log(data);
      this.worldMap = {
        data: [{
          type: 'choropleth',
          locationmode: 'country names',
          locations: data.map(item => item.country),
          z: data.map(item => item.deaths),
          zmin: 0,
          zmax: 20000,
          hoverinfo: 'text',
          hoverlabel: { bgcolor: 'black', bordercolor: 'white' },
          text: data.map(item => `${item.country}: Deaths: ${item.deaths}`),
          colorscale: [
            [0, 'rgb(240, 242, 237)'], [0.1, 'rgb(252, 212, 204)'], [0.2, 'rgb(204, 255, 234)'],
            [0.3, 'rgb(144, 148, 222)'], [0.4, 'rgb(249, 250, 180)'], [0.5, 'rgb(250, 225, 180)'], [0.6, 'rgb(214, 247, 198)'],
            [0.7, 'rgb(232, 89, 70)'], [0.8, 'rgb(173, 247, 184)'], [0.9, 'rgb(185, 147, 230)'], [1, 'rgb(245, 76, 104)']
          ],
          marker: {
            line: {
              color: 'rgb(180,180,180)',
              width: 2
            }
          },
          showscale: false,
        }],
        layout: {
          // // title: 'World Wide Corona Cases',
          // // width: 2900,
          // // height: 1400,
          // width: 1500,
          // height: 950,
          // // width: 1600,
          // // height: 1050,
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0,
          },
          geo: {
            showframe: false,
            showcoastlines: false,
            projection: {
              type: 'equirectangular'
            },
            scope: 'world',
            showland: true,
            showcountries: true,
            countrywidth: 2,
            landcolor: 'rgb(217, 217, 217)',
            subunitwidth: 2,
            // bgcolor: '#696969',
            subunitcolor: 'rgb(255,255,255)',
            countrycolor: 'rgb(255,255,255)',
          }
        },
        config: {
          displayModeBar: false
        }
      };
    });

    this.api.getWorldTimeline().subscribe((data: any) => {
      this.countriesData = data;
      this.data = {
        labels: data['US'].map(item => item.date),
        series: [data['US'].map(item => item.deaths)]
      };

      this.data1 = {
        labels: data['US'].map(item => item.date),
        series: [data['US'].map(item => item.confirmed)]
      };

      this.data2 = {
        labels: data['US'].map(item => item.date),
        series: [data['US'].map(item => item.recovered)]
      };


    })
  }
  
  matTableClick(value) {
    let country = value.country;
    this.country = country;
    console.log(value)
    console.log(this.countriesData[country]);

    this.data = {
      labels: this.countriesData[country].map(item => item.date),
      series: [this.countriesData[country].map(item => item.deaths)]
    };

    this.data1 = {
      labels: this.countriesData[country].map(item => item.date),
      series: [this.countriesData[country].map(item => item.confirmed)]
    };

    this.data2 = {
      labels: this.countriesData[country].map(item => item.date),
      series: [this.countriesData[country].map(item => item.recovered)]
    };
  }
}
