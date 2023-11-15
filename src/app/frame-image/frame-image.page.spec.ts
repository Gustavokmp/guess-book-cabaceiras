import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrameImagePage } from './frame-image.page';

describe('FrameImagePage', () => {
  let component: FrameImagePage;
  let fixture: ComponentFixture<FrameImagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FrameImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
