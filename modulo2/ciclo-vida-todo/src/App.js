import React from 'react'
import styled from 'styled-components'
import './App.css'

const TarefaList = styled.ul`
  padding: 0;
  width: 200px; // Usando styled-components
`

const Tarefa = styled.li`
  text-align: left;
  text-decoration: ${({completa}) => (completa ? 'line-through' : 'none')}; // Usando styled-components
`

const InputsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 10px; // Usando styled-components
`

class App extends React.Component { // usando a class - render
    state = { // criando um state com arrays e strings vazias
      tarefas: [],
      inputValue: '',
      filtro: 'pendentes'
    }

  componentDidUpdate() {

  };

  componentDidMount() {

  };

  onChangeInput = (event) => {
    this.setState ({inputValue: event.target.value})

  }

  criaTarefa = () => {
    const novaTarefa = {
      id: Date.now(),
      texto: this.state.inputValue,
      completa: false
    }
    const novaListaDeTarefas = [novaTarefa,...this.state.tarefas]

    this.setState({tarefas: novaListaDeTarefas})
  }

  selectTarefa = (id) => {
    const novaListaDeTarefas = this.state.tarefas.map((tarefa) =>{
      if(id === tarefa.id){
        const novaTarefa = {
          ...tarefa,
          completa: !tarefa.completa
        }
        return novaTarefa
      }else {
        return tarefa
      }
    })
    this.setState({tarefas: novaListaDeTarefas})
  }

  onChangeFilter = (event) => {

  }

  render() {
    const listaFiltrada = this.state.tarefas.filter(tarefa => {
      switch (this.state.filtro) {
        case 'pendentes':
          return !tarefa.completa
        case 'completas':
          return tarefa.completa
        default:
          return true
      }
    })

    return (
      <div className="App">
        <h1>Lista de tarefas</h1>
        <InputsContainer>
          <input value={this.state.inputValue} onChange={this.onChangeInput}/>
          <button onClick={this.criaTarefa}>Adicionar</button>
        </InputsContainer>
        <br/>

        <InputsContainer>
          <label>Filtro</label>
          <select value={this.state.filter} onChange={this.onChangeFilter}>
            <option value="">Nenhum</option>
            <option value="pendentes">Pendentes</option>
            <option value="completas">Completas</option>
          </select>
        </InputsContainer>
        <TarefaList>
          {listaFiltrada.map(tarefa => {
            return (
              <Tarefa
                completa={tarefa.completa}
                onClick={() => this.selectTarefa(tarefa.id)}
              >
                {tarefa.texto}
              </Tarefa>
            )
          })}
        </TarefaList>
      </div>
    )
  }
}

export default App
