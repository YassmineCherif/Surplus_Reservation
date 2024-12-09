import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurplusListBComponent } from './surplus-list.component';

describe('SurplusListComponent', () => {
  let component: SurplusListBComponent;
  let fixture: ComponentFixture<SurplusListBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurplusListBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurplusListBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
