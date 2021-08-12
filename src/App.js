import GameContainer from './components/GameContainer/GameContainer'
import './App.css'
import Game from './components/Game/Game'
import Controls from './components/controls/Controls';
import LeftDiv from './components/LeftDiv/LeftDiv'
// import MassagePopUp from './components/UI/MessagePopUp/MassagePopUp';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './store/reducers/combineReducer';

const store = createStore(reducers)

function App() {
  return (
    <Provider store={store}>
      <GameContainer>
        {/* <MassagePopUp massage="Paused" /> */}
        <LeftDiv />
        <Game />
        <Controls />
      </GameContainer>
    </Provider>
  );
}

export default App;
