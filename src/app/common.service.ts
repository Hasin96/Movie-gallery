import { Injectable } from '@angular/core';

import { Subscription, ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private CLASS_NAME = 'CommonService';

  constructor() { }

  public replaySubjectComplete<T>(obj: ReplaySubject<T>): ReplaySubject<T> {
    const METHOD_NAME = `${this.CLASS_NAME} replaySubjectComplete()`;
    console.log(METHOD_NAME);

    if (obj !== null && obj !== undefined) {
        obj.complete();
    }

    obj = new ReplaySubject<T>();

    return obj;
}

// ........................................

    // RXJS Subscription

    public isSubscriptionValid(obj: Subscription): boolean {

      return obj !== null && obj !== undefined && !obj.closed;
  }

  public unsubscribe(obj: Subscription) {

      if (this.isSubscriptionValid(obj)) {
          obj.unsubscribe();
      }
  }

  // ........................................

  // Array

  public hasArrayData(obj: any[]): boolean {

      if (obj === undefined) return false;
      if (obj === null) return false;
      if (obj.length === 0) return false;

      return true;
  }

  public isArray(obj: any[]): boolean {

      if (obj === undefined) return false;
      if (obj === null) return false;
      return Array.isArray(obj);
  }

  // ........................................

  // Object

  public notNullorUndefined(obj: any) {

      if (obj === null) return false;
      if (obj === undefined) return false;

      return true;
  }
}
