import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurplusReponseComponent } from './surplus-reponse.component';

describe('SurplusReponseComponent', () => {
  let component: SurplusReponseComponent;
  let fixture: ComponentFixture<SurplusReponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurplusReponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurplusReponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
