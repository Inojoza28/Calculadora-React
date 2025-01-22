// src/components/Calculator.jsx
import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import './css/Calculator.css';

// Componente principal da calculadora
const Calculator = () => {
  // Estado que armazena o valor atualmente exibido na tela
  const [current, setCurrent] = useState('0');
  // Estado que armazena o valor anterior (antes da operação)
  const [prev, setPrev] = useState('');
  // Estado que armazena a operação atual (ex: '+', '-', etc.)
  const [operation, setOperation] = useState(null);

  // Função que lida com os cliques nos botões da calculadora
  const handleClick = (label) => {
    // Verifica se o botão clicado é um número ou o ponto decimal
    if (Number(label) >= 0 || label === '.') {
      // Evita que sejam adicionados múltiplos pontos decimais
      if (label === '.' && current.includes('.')) return;
      
      // Se o valor atual é '0' e o botão clicado não é '.', substitui o '0' pelo novo número
      if (current === '0' && label !== '.') {
        setCurrent(label);
      } else {
        // Caso contrário, adiciona o dígito ao valor atual
        setCurrent(current + label);
      }
    } 
    // Se o botão clicado é 'AC', reseta todos os estados
    else if (label === 'AC') {
      setCurrent('0');
      setPrev('');
      setOperation(null);
    } 
    // Se o botão clicado é '+/-', inverte o sinal do número atual
    else if (label === '+/-') {
      setCurrent((prev) => (prev.charAt(0) === '-' ? prev.slice(1) : '-' + prev));
    } 
    // Se o botão clicado é '%', calcula a porcentagem do número atual
    else if (label === '%') {
      setCurrent((parseFloat(current) / 100).toString());
    } 
    // Se o botão clicado é uma operação aritmética
    else if (['+', '-', '×', '÷'].includes(label)) {
      // Se já existe uma operação anterior, realiza o cálculo antes de definir a nova operação
      if (operation && prev) {
        calculate();
      } else {
        // Caso contrário, armazena o valor atual como o valor anterior
        setPrev(current);
      }
      // Define a operação atual e reseta o valor atual para receber o próximo número
      setOperation(label);
      setCurrent('0');
    } 
    // Se o botão clicado é '=', realiza o cálculo da operação
    else if (label === '=') {
      calculate();
      setOperation(null); // Reseta a operação após o cálculo
    }
  };

  // Função que realiza o cálculo baseado na operação atual
  const calculate = () => {
    let computation;
    const prevNum = parseFloat(prev); // Converte o valor anterior para número
    const currentNum = parseFloat(current); // Converte o valor atual para número

    // Verifica se os valores são números válidos
    if (isNaN(prevNum) || isNaN(currentNum)) return;

    // Executa a operação correspondente
    switch (operation) {
      case '+':
        computation = prevNum + currentNum;
        break;
      case '-':
        computation = prevNum - currentNum;
        break;
      case '×':
        computation = prevNum * currentNum;
        break;
      case '÷':
        if (currentNum === 0) {
          computation = 'Erro'; // Trata divisão por zero
        } else {
          computation = prevNum / currentNum;
        }
        break;
      default:
        return;
    }

    // Atualiza o valor atual com o resultado do cálculo
    setCurrent(computation.toString());
    // Reseta o valor anterior
    setPrev('');
  };

  // Define os botões da calculadora com seus respectivos rótulos e tipos
  const buttons = [
    { label: 'AC', type: 'secondary' },
    { label: '+/-', type: 'secondary' },
    { label: '%', type: 'secondary' },
    { label: '÷', type: 'operator' },
    { label: '7', type: 'number' },
    { label: '8', type: 'number' },
    { label: '9', type: 'number' },
    { label: '×', type: 'operator' },
    { label: '4', type: 'number' },
    { label: '5', type: 'number' },
    { label: '6', type: 'number' },
    { label: '-', type: 'operator' },
    { label: '1', type: 'number' },
    { label: '2', type: 'number' },
    { label: '3', type: 'number' },
    { label: '+', type: 'operator' },
    { label: '0', type: 'number large' },
    { label: '.', type: 'number' },
    { label: '=', type: 'operator' },
  ];

  return (
    <div className="calculator">
      {/* Componente que exibe o valor atual da calculadora */}
      <Display value={current} />
      <div className="buttons">
        {/* Mapeia cada botão definido e renderiza o componente Button correspondente */}
        {buttons.map((btn, index) => (
          <Button
            key={index}
            label={btn.label}
            type={btn.type}
            onClick={handleClick} // Passa a função de clique para o botão
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
