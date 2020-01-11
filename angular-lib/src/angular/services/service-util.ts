import { Observable, throwError, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

export function withErrorChecking(obs: Observable<any>): Observable<any> {
    return obs.pipe(concatMap(response => {
        return response.error ? throwError(response) : of(response);
    }));
}
