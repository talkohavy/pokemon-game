import { compose } from 'redux';
import { connect } from 'react-redux';

// The contained:
import CommandBox from './CommandBox';

// redux actions:
import { enterNewGameMode, attack } from '../reduxxx/game/actions';

// Connect's 1st action:
const mapStateToProps = (state, props) => {
  const { status, curRound, isAttacking } = state.game.curGame;
  return {
    overallStats: state.game.stats,
    curGameStatus: status,
    curRound: curRound,
    isAttacking: isAttacking,
  };
};

// Connect's 2nd action:
const mapDispatchToProps = (dispatch) => {
  return {
    attack: () => dispatch(attack()),
    enterNewGameMode: (data) => dispatch(enterNewGameMode(data)),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  CommandBox
);
