import GameContainer from './components/GameContainer/GameContainer'
import './App.css'
import Game from './components/Game/Game'
import Controls from './components/controls/Controls';
import LeftDiv from './components/LeftDiv/LeftDiv'
import MassagePopUp from './components/UI/MessagePopUp/MassagePopUp';

function App() {
  return (
    <GameContainer>
      {/* <MassagePopUp massage="Paused" /> */}
      <LeftDiv />
      <Game />
      <Controls />
    </GameContainer>
  );
}

export default App;
