import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ntm',
  templateUrl: './ntm.component.html',
  styleUrls: ['./ntm.component.scss']
})
export class NtmComponent implements OnInit {
  worldMap;
  value = '';
  countries;
  graph;
  countrySelect = new FormControl('');
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getWorld().subscribe((worldData: any) => {
      this.api.getWorldTimeline().subscribe((data: any) => {
        console.log(data);
        this.countries = ['World', ...Object.keys(data)];

        this.countrySelect.valueChanges.subscribe(formValue => {
          console.log(formValue);
          if (formValue === 'World') {
            this.worldMap = {
              data: [{
                type: 'choropleth',
                locationmode: 'country names',
                locations: worldData.map(item => item.country),
                z: worldData.map(item => item.totalDeaths),
                zmin: 0,
                zmax: 20000,
                hoverinfo: 'text',
                hoverlabel: { bgcolor: 'black', bordercolor: 'white' },
                text: worldData.map(item => `${item.country}: Deaths: ${item.totalDeaths}`),
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
                // title: 'World Wide Corona Cases',
                // width: 2900,
                // height: 1400,
                // width: 1000,
                // height: 950,
                // width: 1600,
                // height: 1050,
                margin: {
                  l: 0,
                  r: 0,
                  b: 0,
                  t: 0,
                  
                },


                // 'mapbox': {
                //   zoom: 5,
                //   style: "carto-darkmatter",
                // },
                // 'center': {
                //   lon: 0,
                //   lat: 0,
                // },

                'geo': {
                  showframe: false,
                  showcoastlines: false,
                  projection: {
                    type: 'equirectangular'
                  },
                  scope: 'world',

                  // projection: {
                  //   type: 'equirectangular'
                  // },
                  showland: true,
                  showcountries: true,
                  countrywidth: 2,
                  landcolor: 'rgb(217, 217, 217)',
                  subunitwidth: 2,
                  bgcolor: '	#696969',
                  subunitcolor: 'rgb(255,255,255)',
                  countrycolor: 'rgb(255,255,255)',
                }
              }
            };
          } else {
            this.worldMap = null;
            this.graph = {
              result1: [
                {
                  x: data[formValue].map(item => item.date),
                  y: data[formValue].map(item => item.deaths),
                  type: 'scatter', mode: 'lines+points', marker: { color: 'red' }
                },
              ],

              result2: [
                {
                  x: data[formValue].map(item => item.date),
                  y: data[formValue].map(item => item.recovered),
                  type: 'scatter', mode: 'lines+points', marker: { color: 'green' }
                },
              ],

              result3: [
                {
                  x: data[formValue].map(item => item.date),
                  y: data[formValue].map(item => item.confirmed),
                  type: 'scatter', mode: 'lines+points', marker: { color: 'blue' }
                },
              ],


              // new : [result1, result2]

              layout: {
                width: 400, 
                height: 200,
                // margin: {
                //   l: 0,
                //   r: 0,
                //   b: 0,
                //   t: 0,
                //   pad: 4
                // },
              },
            };
          };
        });

        this.countrySelect.setValue('World')

      });

    });
  }



}
