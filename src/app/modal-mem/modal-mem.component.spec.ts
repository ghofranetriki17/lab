import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMemComponent } from './modal-mem.component';

describe('ModalMemComponent', () => {
  let component: ModalMemComponent;
  let fixture: ComponentFixture<ModalMemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMemComponent]
    });
    fixture = TestBed.createComponent(ModalMemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
