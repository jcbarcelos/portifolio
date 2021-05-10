import React, {useState} from 'react';

import axios from 'axios'

import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'
const INITIAL_VALUES = {}

export function getPost() {
    const request = axios.get(`${BASE_URL}`)
    return {
        type: 'NOTICIAS_GET',
        payload: request
    }
}

export function create(values) {
    return submit(values, 'post')
}
export function update(values) {
    return submit(values, 'patch')
}
export function deletePost(values) {
    return submit(values, 'delete')
}

export function showUpdate(form) {
    return [
        selectTab('tabUpdate'),
        showTabs('tabUpdate'),
        initialize('form', form)
    ]
}
export function showDelete(form) {
    return [
        selectTab('tabDelete'),
        showTabs('tabDelete'),
        initialize('form', form)
    ]
}

export function init() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getPost(),
        initialize('form', INITIAL_VALUES)

    ]
}

function submit(values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação realizada com sucesso')
                dispatch([
                    resetForm('form'),
                    init()
                ])
            }).catch(err => {
                const description = err.response.data.message.errors.description
                const title = err.response.data.message.errors.title
                for (const erro in err.response.data.message.errors) {
                    toastr.error('Error', description.message)
                    toastr.error('Error', title.message)
                }
            })
    }
}
