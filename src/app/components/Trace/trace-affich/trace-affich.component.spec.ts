import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceAffichComponent } from './trace-affich.component';

describe('TraceAffichComponent', () => {
  let component: TraceAffichComponent;
  let fixture: ComponentFixture<TraceAffichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraceAffichComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraceAffichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
