import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTicketComponent } from './add-new-ticket.component';

describe('AddNewTicketComponent', () => {
  let component: AddNewTicketComponent;
  let fixture: ComponentFixture<AddNewTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewTicketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
