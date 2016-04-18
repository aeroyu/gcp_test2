import { combineReducers } from 'redux'
import {ADD_FILTER,CHANGE_SELECT_FILTER_OPTION,CLEAR_FILTERS,APPLY_FILTERS} from '../actions/index'

state = {
    availableFilters: [{field: 'status_id', type: 'list'}, {field: 'subject', type: 'string'}],
    selectFilters: [{field: 'status_id', type: '', operateOptions: [], valueOptions: []}],
    filters: [{field: 'status_id', operate: 'o'}, {field: 'tracker_id', operate: '=', values: [26]}],
    issues: [],
    totalCount: 100,
    currentPage: 1,
    isFetching: false
}
function filters(state = {
    availableFilters: [],
    selectFilters: [],
    filters: [],
    issues: [],
    totalCount: 0,
    currentPage: 1,
    isFetching: false
}, action) {
    switch (action.type) {
        case  ADD_FILTER:
            //filterType,
            //     operateOptions,
            //     valuesOptions,
            //     enable: true
            return [...state.filters, {field: action.field, operate: action.operate, values: action.values}]
            break;
        default:
            state
    }
}

const rootReducer = combineReducers({
    filters
})

export default rootReducer