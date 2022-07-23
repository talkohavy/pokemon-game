import { compose } from 'redux';
import { connect } from 'react-redux';

// The contained:
import EndGame from './EndGame';

// redux actions:
import { closeEndGame } from '../../reduxxx/modals/actions';
import { enterNewGameMode /*, hardReset */ } from '../../reduxxx/game/actions';

// Connect's 1st action:
const mapStateToProps = (state, props) => {
  return {
    overallStats: state.game.stats,
    curGameStatus: state.game.curGame.status,
  };
};

// Connect's 2nd action:
const mapDispatchToProps = (dispatch) => {
  return {
    closeEndGame: () => dispatch(closeEndGame()),
    // hardReset: () => dispatch(hardReset()),
    enterNewGameMode: (data) => dispatch(enterNewGameMode(data)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(EndGame);
