import { Component } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent {
  display: string = '';
  history: string = ''; // Nueva cadena para almacenar la historia de entrada
  operators: string[] = [];
  operands: number[] = [];

  addNumber(number: number) {
    this.display += number;
    this.history += number; // Agrega el número a la historia
  }

  addDecimal() {
    if (!this.display.includes('.')) {
      this.display += '.';
      this.history += '.'; // Agrega el punto decimal a la historia
    }
  }

  setOperation(operator: string) {
    this.operators.push(operator);
    this.operands.push(Number(this.display));
    this.history += operator; // Agrega el operador a la historia
    this.display = '';
  }

  calculate() {
    this.operands.push(Number(this.display));
    this.history += '='; // Agrega el signo de igual al historial antes de calcular el resultado

    while (this.operators.length > 0) {
      let leftOperand = this.operands.shift();
      let operator = this.operators.shift();
      let rightOperand = this.operands[0];

      if (leftOperand !== undefined && rightOperand !== undefined) {
        switch(operator) {
          case '+':
            this.operands[0] = leftOperand + rightOperand;
            break;
          case '-':
            this.operands[0] = leftOperand - rightOperand;
            break;
          case '*':
            this.operands[0] = leftOperand * rightOperand;
            break;
          case '/':
            this.operands[0] = leftOperand / rightOperand;
            break;
        }
      }
    }

    if (this.operands[0] !== undefined) {
      this.display = String(this.operands[0]);
      this.history += this.display; // Agrega el resultado al historial
    } else {
      this.display = 'Error';
    }

    this.operands = [];
  }

  clear() {
    this.display = '';
    this.history = ''; // Borra el historial
    this.operands = [];
    this.operators = [];
  }
}