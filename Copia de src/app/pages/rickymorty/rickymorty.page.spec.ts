import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RickymortyPage } from './rickymorty.page';

describe('RickymortyPage', () => {
  let component: RickymortyPage;
  let fixture: ComponentFixture<RickymortyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RickymortyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
