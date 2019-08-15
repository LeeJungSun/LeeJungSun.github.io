export const GET_IMAGE = 'GET_IMAGE';
export const GET_IMAGE_SUCCESS = 'GET_IMAGE_SUCCESS';
export const GET_IMAGE_FAILURE = 'GET_IMAGE_FAILURE';

export const imageLoad = () => ({ type: GET_IMAGE })
export const imageLoadSuccess = (images) => ({ type: GET_IMAGE_SUCCESS, payload: images })
export const imageLoadFailure = () => ({ type: GET_IMAGE_FAILURE })

export const imageActions = {
	imageLoad,
	imageLoadSuccess,
	imageLoadFailure
}