import React from "react";
import Etapa1 from "./components/Etapa1";
import Etapa2 from "./components/Etapa2";
import Etapa3 from "./components/Etapa3";
import Final from "./components/Final";
import "./App.css";

class App extends React.Component {

  state = {
    etapa: 1,
  }
  renderizaTela = () => {
    switch (this.state.etapa) {
      case 1:
        return <Etapa1 />;
      case 2:
        return <Etapa2 />;
      case 3:
        return <Etapa3 />;
      case 4:
        return <Final />;
    }
  }

  proximaPagina = () => {
    if (this.state.etapa === 1){
      this.setState({etapa: 2})
    }
    else if(this.state.etapa === 2){
      this.setState({etapa: 3})
    }
    else if(this.state.etapa === 3){
      this.setState({etapa: 4})
    }
  }
  render () {


    return (
      <div className="App">
        {this.renderizaTela()}
        <br/>
        {this.state.etapa !== 4 && (
          <button onClick={this.proximaPagina}>Próxima etapa</button>
        )}
      </div>
    )
  }
}

export default App;
