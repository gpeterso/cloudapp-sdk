import { defer, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ReadSettingsResponse, WriteSettingsResponse } from '../../lib/public-interfaces';
import { CloudAppOutgoingEvents } from '../../lib/events/outgoing-events';
import { withErrorChecking } from './service-util';

@Injectable({
  providedIn: 'root'
})
export class CloudAppSettingsService {

  constructor() { }

  get(): Observable<ReadSettingsResponse> {
    return withErrorChecking(defer(() => CloudAppOutgoingEvents.settings()));
  }

  set(value: string): Observable<WriteSettingsResponse> {
    return withErrorChecking(defer(() => CloudAppOutgoingEvents.settings(value)));
  }

  remove(): Observable<WriteSettingsResponse> {
    return withErrorChecking(defer(() => CloudAppOutgoingEvents.settings('')));
  }

}
