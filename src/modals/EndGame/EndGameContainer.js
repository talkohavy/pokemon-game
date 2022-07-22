import { compose } from 'redux';
import { connect } from 'react-redux';

// The contained:
import EndGame from './EndGame';

// redux actions:
import { closeEndGame } from '../../reduxxx/modals/actions';

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
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(EndGame);
