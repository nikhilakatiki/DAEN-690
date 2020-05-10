import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  configUrl = 'https://covidtracking.com/api/v1/states/current.json';
  dailyUrl = 'https://covidtracking.com/api/v1/us/daily.json';
  worldUrl = "https://coronavirus-19-api.herokuapp.com/countries";
  worldTimeline = "https://pomber.github.io/covid19/timeseries.json";
  constructor(private http: HttpClient) { }

  getConfig() {
    return this.http.get(this.configUrl);
  }

  getDaily() {
    return this.http.get(this.dailyUrl);
  }

  getWorld() {
    return this.http.get(this.worldUrl);
  }

  getWorldTimeline() {
    return this.http.get(this.worldTimeline);
  }
}


  //worldUrl = "https://data.nepalcorona.info/api/v1/world/history";
  // worldUrl = 'https://nepalcorona.info/api/v1/data/world';
   // configUrl = '/data';