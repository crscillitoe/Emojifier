import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTheSvgsComponent } from './all-the-svgs.component';

describe('AllTheSvgsComponent', () => {
  let component: AllTheSvgsComponent;
  let fixture: ComponentFixture<AllTheSvgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTheSvgsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTheSvgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
