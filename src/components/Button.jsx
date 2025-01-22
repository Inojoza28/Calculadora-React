// src/components/Button.jsx
import React from 'react';
import './css/Button.css';

// Componente Button que representa um botão individual na calculadora
const Button = ({ label, onClick, type }) => {
  // Não renderiza nada se o label estiver vazio
  if (label === '') {
    return <div className="button empty"></div>;
  }

  // Verifica se o botão deve ser exibido em tamanho grande
  const isLarge = type.includes('large');
  
  // Define as classes CSS do botão com base no tipo e no tamanho
  const className = `button ${isLarge ? 'large' : ''} ${type}`;

  return (
    // Renderiza o botão com as classes definidas e a função de clique
    <button className={className} onClick={() => onClick(label)}>
      {label} {/* Exibe o rótulo do botão */}
    </button>
  );
};

export default Button;
