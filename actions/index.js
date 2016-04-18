import fetch from 'isomorphic-fetch'
export const ADD_FILTER = 'ADD_FILTER'


export const ADD_SELECT_FILTER = 'ADD_SELECT_FILTER'
export const REMOVE_SELECT_FILTER = 'REMOVE_SELECT_FILTER'
export const TOGGLE_SELECT_FILTER = 'TOGGLE_SELECT_FILTER'
export const CHANGE_SELECT_FILTER_OPTION = 'CHANGE_SELECT_FILTER_OPTION'


export const CLEAR_FILTERS = 'CLEAR_FILTERS'
export const APPLY_FILTERS = 'APPLY_FILTERS'

export const RECEIVE_ISSUES_SUCCEED = 'RECEIVE_ISSUES_SUCCEED'
export const RECEIVE_ISSUES_FAIL = 'RECEIVE_ISSUES_FAIL'

export const PAGE_CHANGE = 'PAGE_CHANGE'
export const PAGE_CHANGE_SUCCEED = 'PAGE_CHANGE_SUCCEED'
export const PAGE_CHANGE_FAIL = 'PAGE_CHANGE_FAIL'

export function addFilter(field, operate, values) {
    return {
        type: ADD_FILTER,
        field,
        operate,
        values
    }
}

export function addSelectFilter(filterType, operateOptions, valuesOptions) {
    return {
        type: ADD_SELECT_FILTER,
        filterType,
        operateOptions,
        valuesOptions,
        enable: true
    }
}

export function changeSelectFilterOption(filed, type, values) {
    return {
        type: CHANGE_SELECT_FILTER_OPTION,
        filed,
        type,
        values
    }
}

export function clearFilters() {
    return {
        type: CLEAR_FILTERS
    }
}

export function applyFilters() {
    return {
        type: APPLY_FILTERS
    }
}

function receiveIssueSucceed(issues, totalCount, offset, pageCount) {
    return {
        type: RECEIVE_ISSUES_SUCCEED,
        issues,
        totalCount,
        currentPage: offset / pageCount
    }
}

function getIssuesFromServer(filters) {
    function getQueryStrFromFilters(filters) {
        var queryStrArr = []
        filters.each((filter)=> {
            [['field', 'f'], ['operate', 'op'], ['values', 'v']].each(k=> {
                if (filter[k[0]]) {
                    queryStrArr.push(`${k[1]}=${filterfilter[k[0]]}`)
                }
            })

        })
        return queryStrArr.join('&')
    }

    return dispatch => {
        dispatch(applyFilters())
        return fetch(`http://127.0.0.1:3001/projects/g63/issues.json?${getQueryStrFromFilters(filters)}`)
            .then(response => response.json())
            .then(json => dispatch(receiveIssueSucceed(json['issues'], json['total_count'], json['offset'], json['limit'])))
    }
}