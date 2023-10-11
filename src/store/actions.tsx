export const GET_DATA = 'GET_DATA'
export const GO_TO_PAGE = 'GO_TO_PAGE'
export const SORT_BY_ID = 'SORT_BY_ID'
export const SORT_BY_TITLE = 'SORT_BY_TITLE'
export const SORT_BY_BODY = 'SORT_BY_BODY'
export const FIND = 'FIND'

const API_URL = 'https://jsonplaceholder.typicode.com/posts'

export const getPosts = () => {
    try {
        return async dispatch => {
            const result = await fetch(API_URL);
            const json = await result.json();
            if (json) {
                dispatch({
                    type: GET_DATA,
                    payload: json
                })
            } else {
                console.log('UNABLE TO FETCH!')
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const goToPage = page => dispatch => {
    dispatch({
        type: GO_TO_PAGE,
        payload: page
    })
}

export const sortById = type => dispatch => {
    dispatch({
        type: SORT_BY_ID,
        payload: type
    })
}

export const sortByTitle = type => dispatch => {
    dispatch({
        type: SORT_BY_TITLE,
        payload: type
    })
}

export const sortByBody = type => dispatch => {
    dispatch({
        type: SORT_BY_BODY,
        payload: type
    })
}

export const find = val => dispatch => {
    dispatch({
        type: FIND,
        payload: val
    })
}