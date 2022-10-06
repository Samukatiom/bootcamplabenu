import React from "react";

class Etapa1 extends React.Component {
    render() {
        return (
            <main>
                <h2>ETAPA 1 - DADOS GEREAIS</h2>
                <p>1. Qual é seu nome?</p>
                <input/>
                <p>2. Qual é sua idade??</p>
                <input/>
                <p>3. Qual é seu e-mail?</p>
                <input/>
                <p>4. Qual a sua escolaridade?</p>
                <select>
                    <option value='Ensino médio incompleto'>Ensino médio incompleto</option>
                    <option value='Ensino médio completo'>Ensino médio completo</option>
                    <option value='Ensino superior incompleto'>Ensino superior incompleto</option>
                    <option value='Ensino superior completo'>Ensino superior completo</option>
                </select>

            </main>
        )
    }
}
export default Etapa1
  