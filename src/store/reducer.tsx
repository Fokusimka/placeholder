import { GO_TO_PAGE, GET_DATA, SORT_BY_ID, SORT_BY_TITLE, SORT_BY_BODY, FIND } from './actions'

const initialState = {
  allPages: [],
  pagesCount: Array(Math.ceil([].length / 10)),
  selectedPage: [],
  findPage: []
};


const rowsPerPage = 10
const rowsPerPageWithoutFirst = rowsPerPage - 1

export function postsReducer(state = initialState, action: any) {
    switch (action.type) {
        case GO_TO_PAGE: 
            return { 
                allPages: state.allPages,
                pagesCount: Array(Math.ceil(state.allPages.length / 10)),
                selectedPage: state.allPages.filter((item, index) => {
                    if (action.payload === 0) {
                        return index <= 9 && item
                    } else {
                        return index >= (action.payload * rowsPerPage) 
                        && index <= ((action.payload * rowsPerPage + rowsPerPageWithoutFirst)) 
                        && item
                    }
                  }),
                findPage: []
            }
        case GET_DATA: 
            return { 
                allPages: action.payload,
                pagesCount: Array(Math.ceil(action.payload.length / 10)),
                selectedPage: action.payload.filter((item, index) => {
                        return index <= 9 && item
                  }),
                findPage: []
            }
        case SORT_BY_ID: {
            return { 
                ...state,
                selectedPage: state.selectedPage.sort((a, b) => action.payload === 'normal' ? a.id - b.id : b.id - a.id)
            }
        }
        case SORT_BY_TITLE: {
            return { 
                ...state,
                selectedPage: state.selectedPage.sort((a, b) => action.payload === 'normal' ? (a.title > b.title ? 1 : -1) : (a.title > b.title ? -1 : 1))
            }
        }
        case SORT_BY_BODY: {
            return { 
                ...state,
                selectedPage: state.selectedPage.sort((a, b) => action.payload === 'normal' ? (a.body > b.body ? 1 : -1) : (a.body > b.body ? -1 : 1))
            }
        }
        case FIND: {
            let newSelected = state.selectedPage.filter((item: any) => {
                return item.id === Number(action.payload) || 
                item.title.includes(action.payload) || 
                item.body.includes(action.payload) && item
            })
            return { 
                ...state,
                findPage: newSelected.length === 0 ? [{error: 'Ничего не нашлось'}] : newSelected
            }
        }
        default: 
            return state
    }
  }
