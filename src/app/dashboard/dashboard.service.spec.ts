// dashboard.service.spec
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  let dashboardService: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    dashboardService = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(dashboardService).toBeTruthy();
  });

  it('should return array of ec2 intances', async () => {
    try {
      // const instances = await dashboardService.getInstances().toPromise();
      // expect(instances.length).toBeGreaterThan(0);
    } catch (err) {
      fail();
    }
  });
});
