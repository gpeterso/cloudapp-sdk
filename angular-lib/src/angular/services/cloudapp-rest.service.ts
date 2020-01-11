import { Injectable } from '@angular/core';
import { defer, Observable, throwError, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

import { CloudAppRest } from '../../lib/rest';
import { RestResponse, RestErrorResponse } from '../../lib/public-interfaces';
import { RestServiceLogger as logger } from './service-loggers';

export import Request = CloudAppRest.Request;
export import HttpMethod = CloudAppRest.HttpMethod;

@Injectable({
  providedIn: 'root'
})
export class CloudAppRestService {

  constructor() { }

  call(request: string | Request): Observable<RestResponse | RestErrorResponse> {
    let req = request;
    if (typeof request === 'string') {
      req = { url: request };
    }
    logger.log('Calling API', req);
    return defer(() => CloudAppRest.call(req as Request)).pipe(
      concatMap(response => {
        if (response.error) {
          logger.log('Response NOT OK', response);
          return throwError(response.error as RestErrorResponse);
        }
        logger.log('Response OK', response);
        return of(response.body as RestResponse);
      })
    );
  }

}
