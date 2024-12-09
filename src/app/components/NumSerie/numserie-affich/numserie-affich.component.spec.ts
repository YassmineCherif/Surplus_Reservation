import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumserieAffichComponent } from './numserie-affich.component';

describe('NumserieAffichComponent', () => {
  let component: NumserieAffichComponent;
  let fixture: ComponentFixture<NumserieAffichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumserieAffichComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumserieAffichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
