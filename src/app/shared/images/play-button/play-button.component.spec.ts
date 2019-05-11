import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayButtonComponent } from './play-button.component';

describe('PlayButtonComponent', () => {
  let component: PlayButtonComponent;
  let fixture: ComponentFixture<PlayButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('color inversion', () => {
    it('adds color inversion class to button svg when input invertColors is true', () => {
      component.invertColors = true;
      fixture.detectChanges();
      const buttonSvg = fixture.elementRef.nativeElement.querySelector('svg') as HTMLElement;
      expect(buttonSvg.classList).toContain('invert-colors');
    });

    it('removes color inversion class from button svg when input invertColors is false', () => {
      component.invertColors = false;
      fixture.detectChanges();
      const buttonSvg = fixture.elementRef.nativeElement.querySelector('svg') as HTMLElement;
      expect(buttonSvg.classList).not.toContain('invert-colors');
    });
  });
});
