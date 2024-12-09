import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceCreateComponent } from './trace-create.component';

describe('TraceCreateComponent', () => {
  let component: TraceCreateComponent;
  let fixture: ComponentFixture<TraceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraceCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
