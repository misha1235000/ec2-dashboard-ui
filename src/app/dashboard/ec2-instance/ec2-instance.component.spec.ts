// etc2-instance.component.spec

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ec2InstanceComponent } from './ec2-instance.component';

describe('Ec2InstanceComponent', () => {
  let component: Ec2InstanceComponent;
  let fixture: ComponentFixture<Ec2InstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ec2InstanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Ec2InstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
