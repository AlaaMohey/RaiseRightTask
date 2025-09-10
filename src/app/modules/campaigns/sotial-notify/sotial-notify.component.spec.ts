import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SotialNotifyComponent } from './sotial-notify.component';

describe('SotialNotifyComponent', () => {
  let component: SotialNotifyComponent;
  let fixture: ComponentFixture<SotialNotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SotialNotifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SotialNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
