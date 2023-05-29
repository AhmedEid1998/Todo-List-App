import { TestBed } from '@angular/core/testing';
import { LogGuard } from './log.guard';



describe('logGuard', () => {
  let guard: LogGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
