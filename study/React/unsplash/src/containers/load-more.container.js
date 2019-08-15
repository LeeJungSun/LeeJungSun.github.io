import LoadMore from '../components/load-more';
import { imageActions } from '../store/action';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
	images: state.imageReducer.images,
	isPending: state.imageReducer.isPending
});

const mapDispatchToTrops = dispatch => ({
	imageLoad: () => dispatch(imageActions.imageLoad),
	imageLoadSuccess: (images) => dispatch(imageActions.imageLoadSuccess(images)),
	imageLoadFailure: () => dispatch(imageActions.imageLoadFailure())
})

export default connect(
	mapStateToProps,
	mapDispatchToTrops
)(LoadMore); //picturelist에 props로 몰아 넣어줌