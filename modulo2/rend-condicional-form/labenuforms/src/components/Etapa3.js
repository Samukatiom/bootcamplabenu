import React from "react";

class Etapa3 extends React.Component {

    render () {
        return (
            <section>
                <h3>ETAPA 3- INFORMAÇÕES GERAIS DE ENSINO</h3>
                <p>7. Por que você não terminou um curso de graduação?</p>
                <input/>
                <p>6. Você fez algum curso complementar?</p>
                <select>
                    <option value='Nenhum'>Nenhum</option>
                    <option value='Curso tecnico'>Cruso técnico</option>
                    <option value='Curso de ingles'>Curso de inglês</option>
                </select>

            </section>
        )
    }
}
export default Etapa3