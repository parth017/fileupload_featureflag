import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SplitFactory } from '@splitsoftware/splitio';
import { variable } from '@angular/compiler/src/output/output_ast';
const factory: SplitIO.ISDK = SplitFactory({ 
  core: {
    authorizationKey: 'v0gs87g1pd0frk07c62eqdr1kkhebo05bkne'
  }
});
const client: SplitIO.IClient = factory.client();
client.on(client.Event.SDK_READY, () => {
  const treatment: SplitIO.Treatment = client.getTreatment('parth','testspilt');
  debugger;
  if (treatment == 'control') {

   
  } 
});
@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent { 
   
  public forecasts: WeatherForecast[];  
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
