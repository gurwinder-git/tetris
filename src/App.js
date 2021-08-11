import GameContainer from './components/GameContainer/GameContainer'
import './App.css'
import Game from './components/Game/Game'
import Controls from './components/controls/Controls';
import LeftDiv from './components/LeftDiv/LeftDiv'

function App() {
  return (
    <GameContainer>
      <LeftDiv />
      <Game />
      <Controls />
    </GameContainer>
  );
}

export default App;
