import PropTypes from 'prop-types';
import { Btn } from './ButtonLoad.styled';

export default function Button({ onClickLoadMore }) {
  return (
    <>
      <Btn type="button" onClick={onClickLoadMore}>
        Load more
      </Btn>
    </>
  );
}

Button.propTypes = {
  onClickLoadMore: PropTypes.func.isRequired,
};
