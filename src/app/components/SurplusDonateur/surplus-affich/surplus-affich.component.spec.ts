import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurplusListComponent } from './surplus-affich.component'; 

describe('OperationAffichComponent', () => {
  let component: SurplusListComponent;
  let fixture: ComponentFixture<SurplusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurplusListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurplusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
