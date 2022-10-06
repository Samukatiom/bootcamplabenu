import React from 'react';
import './CardPequeno.css'

function CardPequeno(props) {
    return (
        <div className="smallard-container">
            <img src={ props.imagem } />
            <p className='negrito'>{ props.texto }</p>
            <p>{ props.descricao }</p>
        </div>
    )
}

export default CardPequeno;