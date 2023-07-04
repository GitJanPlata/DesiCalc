import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent {
  display: string = '';
  leftOperand: number | null = null;
  operator: string | null = null;

  addNumber(number: number) {
    this.display += number;
  }

  addDecimal() {
    if (!this.display.includes('.')) {
      this.display += '.';
    }
  }

  setOperation(operator: string) {
    if (this.operator && this.leftOperand !== null) {
      this.calculate();
    }
  
    this.leftOperand = Number(this.display);
    this.operator = operator;
    this.display += operator;
  }

  calculate() {
    if (this.operator && this.leftOperand !== null) {
      let rightOperand = Number(this.display.slice(this.display.indexOf(this.operator) + 1));
      
      switch(this.operator) {
        case '+':
          this.display = String(this.leftOperand + rightOperand);
          break;
        case '-':
          this.display = String(this.leftOperand - rightOperand);
          break;
        case '*':
          this.display = String(this.leftOperand * rightOperand);
          break;
        case '/':
          this.display = String(this.leftOperand / rightOperand);
          break;
      }
    }
  
    this.operator = null;
    this.leftOperand = null;
  }

  clear() {
    this.display = '';
    this.leftOperand = null;
    this.operator = null;
  }
}