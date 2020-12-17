import { Injectable } from '@angular/core';
import { fromEventPattern, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CloudAppEventsService } from './cloudapp-events.service';
import {
  Entity,
  PageInfo,
  RefreshPageResponse,
} from '../../lib/public-interfaces';

/**
 * Wraps the CloudAppEventService to provide a simplified interface for
 * interacting with the currently-loaded Alma page.
 */
@Injectable({
  providedIn: 'root',
})
export class CloudAppPageService {
  constructor(private eventsService: CloudAppEventsService) {}

  /**
   * Never completes; be sure to unsubscribe or use an async pipe.
   */
  readonly entities$: Observable<Entity[]> = fromEventPattern<PageInfo>(
    (handler) => this.eventsService.onPageLoad(handler),
    (_, subscription) => subscription.unsubscribe()
  ).pipe(
    map((pageInfo) => pageInfo.entities ?? [])
  );

  refresh(): Observable<RefreshPageResponse> {
    return this.eventsService.refreshPage();
  }

  back(): Observable<RefreshPageResponse> {
    return this.eventsService.back();
  }

  home(): Observable<RefreshPageResponse> {
    return this.eventsService.home();
  }
}
