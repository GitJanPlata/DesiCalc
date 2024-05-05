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
  
    // Primero maneja las multiplicaciones y divisiones
    for (let i = 0; i < this.operators.length; i++) {
      if (this.operators[i] === '*' || this.operators[i] === '/') {
        let leftOperand = this.operands[i];
        let operator = this.operators[i];
        let rightOperand = this.operands[i + 1];
  
        if (leftOperand === undefined || rightOperand === undefined) {
          this.display = 'Error';
          this.operands = [];
          this.operators = [];
          return;
        }
  
        switch(operator) {
          case '*':
            this.operands[i] = leftOperand * rightOperand;
            break;
          case '/':
            if(rightOperand === 0) {
              this.display = 'Error';
              this.operands = [];
              this.operators = [];
              return;
            }
            this.operands[i] = leftOperand / rightOperand;
            break;
        }
  
        this.operands.splice(i + 1, 1); // Elimina el operando que ya se ha utilizado
        this.operators.splice(i, 1); // Elimina el operador que ya se ha utilizado
        i--; // Ajusta el índice para tener en cuenta los elementos que se han eliminado
      }
    }
  
    // Luego maneja las sumas y restas
    while (this.operators.length > 0) {
      let leftOperand = this.operands.shift();
      let operator = this.operators.shift();
      let rightOperand = this.operands[0];
  
      if (leftOperand === undefined || rightOperand === undefined) {
        this.display = 'Error';
        this.operands = [];
        this.operators = [];
        return;
      }
  
      switch(operator) {
        case '+':
          this.operands[0] = leftOperand + rightOperand;
          break;
        case '-':
          this.operands[0] = leftOperand - rightOperand;
          break;
      }
    }
  
    if (this.operands[0] !== undefined) {
      this.display = this.roundToTwoDecimals(this.operands[0]);
    } else {
      this.display = 'Error';
    }
  
    this.operands = [];
  }

  roundToTwoDecimals(number: number): string {
    return Number(number.toFixed(2)).toString(); // Redondea a 2 decimales y convierte a cadena
  }

  clear() {
    this.display = '';
    this.history = ''; // Borra el historial
    this.operands = [];
    this.operators = [];
  }
}
