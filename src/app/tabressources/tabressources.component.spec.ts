import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabressourcesComponent } from './tabressources.component';

describe('TabressourcesComponent', () => {
  let component: TabressourcesComponent;
  let fixture: ComponentFixture<TabressourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabressourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabressourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
