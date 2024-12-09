import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurplusCreateComponent } from './operation-create.component';

describe('OperationCreateComponent', () => {
  let component: SurplusCreateComponent;
  let fixture: ComponentFixture<SurplusCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurplusCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurplusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
