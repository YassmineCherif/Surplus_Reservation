import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefrigerateurEditComponent } from './refrigerateur-edit.component';

describe('RefrigerateurEditComponent', () => {
  let component: RefrigerateurEditComponent;
  let fixture: ComponentFixture<RefrigerateurEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefrigerateurEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefrigerateurEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
