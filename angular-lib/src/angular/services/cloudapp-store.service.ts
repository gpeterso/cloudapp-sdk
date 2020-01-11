import { defer, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { CloudAppOutgoingEvents } from '../../lib/events/outgoing-events';
import { withErrorChecking } from './service-util';

@Injectable({
  providedIn: 'root'
})
export class CloudAppStoreService {

  constructor() { }

  get(key: string): Observable<any> {
    return withErrorChecking(defer(() => CloudAppOutgoingEvents.store(key)));
  }

  set(key: string, value: any): Observable<any> {
    return withErrorChecking(defer(() => CloudAppOutgoingEvents.store(key, value)));
  }

  remove(key: string): Observable<any> {
    return withErrorChecking(defer(() => CloudAppOutgoingEvents.store(key, null)));
  }

}
