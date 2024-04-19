import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaFornecedoresComponent } from './consulta-fornecedores.component';

describe('ConsultaFornecedoresComponent', () => {
  let component: ConsultaFornecedoresComponent;
  let fixture: ComponentFixture<ConsultaFornecedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaFornecedoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
