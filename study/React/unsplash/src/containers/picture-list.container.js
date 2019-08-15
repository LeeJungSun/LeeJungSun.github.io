import PictureList from '../components/picture-list';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
	images: state.imageReducer.images,
	isPending: state.imageReducer.isPending
});

const mapDispatchToTrops = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToTrops
)(PictureList); //picturelist에 props로 몰아 넣어줌