import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuestBookPage } from './guest-book.page';

describe('GuestBookPage', () => {
  let component: GuestBookPage;
  let fixture: ComponentFixture<GuestBookPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GuestBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
