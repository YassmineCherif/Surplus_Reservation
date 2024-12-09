import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesrefrigerateurComponent } from './mesrefrigerateur.component';

describe('MesrefrigerateurComponent', () => {
  let component: MesrefrigerateurComponent;
  let fixture: ComponentFixture<MesrefrigerateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesrefrigerateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesrefrigerateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
