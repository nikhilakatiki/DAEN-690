import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss'],
})

export class CovidComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  value = '';
  states: any;
  displayedColumns: string[] = ['state', 'positive'];
  deaths;
  recovered;
  chloropethMap;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getConfig().subscribe((data: any) => {
      this.states = new MatTableDataSource(data);
      this.states.sort = this.sort;

      this.chloropethMap = {
        data: [{
          type: 'choropleth',
          locationmode: 'USA-states',
          locations: data.map(item => item.state),
          hoverinfo: 'text',
          text: data.map(item => `${item.state}: Total cases: ${item.totalTestResults}`),
          z: data.map(item => item.totalTestResults),
          zmin: 0,
          zmax: 1000000,
          colorbar: {
            thickness: 25,
          },
          marker: {
            line: {
              color: 'rgb(255,255,255)',
              width: 2
            },
          }
        }],
        layout: {
          title: 'Cases across USA  **inculdes total count of postive,negative cases',
          height: 650,
          // width: 1100,
          'geo': {
            scope: 'usa',
            showlakes: true,
            lakecolor: 'rgb(255,255,255)'

          },
          'projection': { scale: 3 }
        },
        config: {
          displayModeBar: false
        }
      };
    });

    this.api.getDaily().subscribe((data: any) => {

      this.deaths = {
        data: [
          {
            x: data.map(item => item.dateChecked),
            y: data.map(item => item.death),
            type: 'scatter', mode: 'lines+points', marker: { color: 'red' }
          },
        ],
        layout: {
          title: "Cases Deceased",
          // width: 400,
          // margin: {
          //   l: 0,
          //   r: 0,
          //   b: 0,
          //   t: 0,
          // },
          //  height: 300 
        },
        config: {
          displayModeBar: false
        }
      };

      this.recovered = {
        data: [
          {
            x: data.map(item => item.dateChecked),
            y: data.map(item => item.recovered),
            type: 'scatter', mode: 'lines+points', marker: { color: 'green' },

          },
        ],
        layout: {
          title: "Cases Recovered",
          //  width: 400,
          // margin: {
          //   l: 0,
          //   r: 0,
          //   b: 0,
          //   t: 0,
          // },
          //  height: 300
        },
        config: {
          displayModeBar: false
        }

      };
      console.log(data);
    });
  }

  ngAfterViewInit() {

  }

}