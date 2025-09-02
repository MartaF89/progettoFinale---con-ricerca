import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDatailModalComponent } from './movie-datail-modal.component';

describe('MovieDatailModalComponent', () => {
  let component: MovieDatailModalComponent;
  let fixture: ComponentFixture<MovieDatailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDatailModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDatailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
