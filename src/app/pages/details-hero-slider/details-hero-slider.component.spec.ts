import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsHeroSliderComponent } from './details-hero-slider.component';

describe('DetailsHeroSliderComponent', () => {
  let component: DetailsHeroSliderComponent;
  let fixture: ComponentFixture<DetailsHeroSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsHeroSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsHeroSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
