import GlobalState from "./Global/GlobalState";
import MainPage from "./page/MainPage";

function App() {
  return (
    <GlobalState>
      <MainPage />
    </GlobalState>
  );
}
export default App;
