import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetUpdateComponent } from './pet-update.component';

describe('PetUpdateComponent', () => {
  let component: PetUpdateComponent;
  let fixture: ComponentFixture<PetUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
