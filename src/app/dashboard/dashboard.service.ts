// dashboard.service

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iec2Instance } from './ec2-instance/iec2-instance';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardUrl = `${environment.dashboardApi}/api/ec2`;

  constructor(private http: HttpClient) { }

  /**
   * Gets the instances
   */
  getInstances(): Observable<Iec2Instance[]> {
    return this.http.get<Iec2Instance[]>(this.dashboardUrl).pipe(
      catchError(this.handleError<Iec2Instance[]>('getInstances', []))
    );
  }

  /**
   * handleError
   */
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);

      throw new Error(`Error in operation: ${operation}: ${error.message}`);
    };
  }
}
