import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefrigerateurCreerComponent } from './refrigerateur-creer.component';

describe('RefrigerateurCreerComponent', () => {
  let component: RefrigerateurCreerComponent;
  let fixture: ComponentFixture<RefrigerateurCreerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefrigerateurCreerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefrigerateurCreerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
