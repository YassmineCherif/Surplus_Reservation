import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefrigerateurListComponent } from './refrigerateur-list.component';

describe('RefrigerateurListComponent', () => {
  let component: RefrigerateurListComponent;
  let fixture: ComponentFixture<RefrigerateurListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefrigerateurListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefrigerateurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
