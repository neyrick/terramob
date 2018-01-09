import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocRessourceComponent } from './bloc-ressource.component';

describe('BlocRessourceComponent', () => {
  let component: BlocRessourceComponent;
  let fixture: ComponentFixture<BlocRessourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlocRessourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
