import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurplusEditComponent } from './surplus-edit.component';

describe('OperationEditComponent', () => {
  let component: SurplusEditComponent;
  let fixture: ComponentFixture<SurplusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurplusEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurplusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
