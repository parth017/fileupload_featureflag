import { SplitioService } from './../splitio.service';
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SplitFactory } from '@splitsoftware/splitio';
import { variable } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent { 
  treatment: string;

  public forecasts: WeatherForecast[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string,public splitioService: SplitioService ) {
        

    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }

  ngOnInit() {
    this.splitioService.initSdk();
    
    }  
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
