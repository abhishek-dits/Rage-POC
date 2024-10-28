import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineFiltersComponent } from './inline-filters.component';

describe('InlineFiltersComponent', () => {
  let component: InlineFiltersComponent;
  let fixture: ComponentFixture<InlineFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InlineFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
