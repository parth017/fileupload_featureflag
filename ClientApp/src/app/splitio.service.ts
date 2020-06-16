import { Injectable } from '@angular/core';
import { SplitFactory } from '@splitsoftware/splitio';
import { fromEvent } from 'rxjs';

@Injectable()
export class SplitioService {

  splitio: SplitIO.ISDK;
  splitClient: SplitIO.IClient;
  isReady = false;
  treatments: SplitIO.Treatments;
  features: string[] = [
    'testsplit',

  ];

  constructor() { }

  initSdk(): void {
    // Running the SDK in 'off-the-grid' Mode since authorizationKey : 'localhost'
    // To bind a non 'off-the-grid' client, inject the real API Key
    this.splitio = SplitFactory({
      core: {
        authorizationKey: 'v0gs87g1pd0frk07c62eqdr1kkhebo05bkne',
        key: 'parth'
      },
    });

    this.splitClient = this.splitio.client();

    // verify if sdk is initialized
   
    this.verifyReady();
  }

  private verifyReady(): void {
    const isReadyEvent = fromEvent(this.splitClient, this.splitClient.Event.SDK_READY);

    const subscription = isReadyEvent.subscribe({
      next() {
        this.isReady = true;
        console.log('Sdk ready: ', this.isReady);
      },
      error(err) {
        console.log('Sdk error: ', err);
        this.isReady = false;
      }
    });
  }

  getTreatments(): void {
    this.treatments = this.splitClient.getTreatments(this.features);
  }

}
