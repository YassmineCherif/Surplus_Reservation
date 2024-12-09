import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumserieCreateComponent } from './numserie-create.component';

describe('NumserieCreateComponent', () => {
  let component: NumserieCreateComponent;
  let fixture: ComponentFixture<NumserieCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumserieCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumserieCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
