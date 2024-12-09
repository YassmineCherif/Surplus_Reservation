import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumserieEditComponent } from './numserie-edit.component';

describe('NumserieEditComponent', () => {
  let component: NumserieEditComponent;
  let fixture: ComponentFixture<NumserieEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumserieEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumserieEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
