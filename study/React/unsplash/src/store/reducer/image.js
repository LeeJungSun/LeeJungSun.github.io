import * as image from './../action'

const { GET_IMAGE, GET_IMAGE_SUCCESS, GET_IMAGE_FAILURE } = image;

const initalState = {
	images: [],
	isPending: false
}

const imageReducer = (state = initalState, action) => {
	switch (action.type) {
		case GET_IMAGE:
			return { ...state, isPending: true };
		case GET_IMAGE_SUCCESS:
			return { ...state, isPending: false, images: [...state.images, ...action.payload]};
		case GET_IMAGE_FAILURE:
			return { ...state, isPending: false };
		default:
			return state;
	}
}
export default imageReducer;