// src/components/Display.jsx
import React from 'react';
import './css/Display.css';

/**
 * Componente Display que exibe o valor atual da calculadora.
 *
 * Props:
 * - value (string): O valor a ser exibido na tela da calculadora.
 */
const Display = ({ value }) => {
  return (
    // Container principal do display com a classe CSS 'display'
    <div className="display">
      {value} {/* Exibe o valor passado via props */}
    </div>
  );
};

export default Display;
