import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAll } from './auth-all';

describe('AuthAll', () => {
  let component: AuthAll;
  let fixture: ComponentFixture<AuthAll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthAll]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthAll);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
