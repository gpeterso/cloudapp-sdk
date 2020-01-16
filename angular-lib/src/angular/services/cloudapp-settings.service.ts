import { defer, Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { ReadSettingsResponse, WriteSettingsResponse } from '../../lib/public-interfaces';
import { CloudAppOutgoingEvents } from '../../lib/events/outgoing-events';
import { withErrorChecking } from './service-util';
import { AbstractControl, FormArray, FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CloudAppSettingsService {

  constructor() { }

  get(): Observable<any> {
    return withErrorChecking(defer(() => CloudAppOutgoingEvents.settings()).pipe(
      concatMap(response => of(JSON.parse(response.settings || '{}')))
    ));
  }

  getAsFormGroup = (): Observable<any> => this.get().pipe(map(settings => this.asFormGroup(settings)));

  set(value: any): Observable<WriteSettingsResponse> {
    return withErrorChecking(defer(() => CloudAppOutgoingEvents.settings(JSON.stringify(value || {}))));
  }

  remove = (): Observable<WriteSettingsResponse> => this.set('');

  private asFormGroup(object: Object): AbstractControl {
    if (Array.isArray(object)) {
      return new FormArray(object.map(entry=>this.asFormGroup(entry)));
    } else if (typeof object === 'object') {
      return new FormGroup(this.mapObject(object, obj => this.asFormGroup(obj)));
    } else {
      return new FormControl(object);
    }   
  }

  private mapObject(object: Object, mapFn: Function) {
    return Object.keys(object).reduce(function(result, key) {
      result[key] = mapFn(object[key])
      return result
    }, {})
  }
}
