/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2018-01-20 20:59:49
 */

'use strict';

// import { get } from '../../services/fetch';
import * as types from '../types';
import languages from '../../services/languages';
import findOne from '../../services/findOne';
import storage from '../../services/storage';

export const getters = {
    bookmarks: state => state.bookmarks,
};

export const actions = {
    async fetchBookmarks ({ commit }) {
        const data = storage.getItem('GITHUBER_BOOKMARKS') || [];

        if (!data.length) {
            data.push({
                name: 'Dribbble - Show and tell for designers',
                url: 'https://dribbble.com/',
                logo: 'https://cdn.dribbble.com/assets/dribbble-ball-192-ec064e49e6f63d9a5fa911518781bee0c90688d052a038f8876ef0824f65eaf2.png'
            });
            storage.setItem('GITHUBER_BOOKMARKS', data);
        }

        commit(types.RECEIVE_BOOKMARKS, data);
        return data;
    },
    async saveBookmark ({ commit }, item) {
        commit(types.SAVE_BOOKMARKS, item);
        return item;
    },
};

export const mutations = {
    [types.RECEIVE_BOOKMARKS](state, data) {
        state.bookmarks = data;
    },
    [types.SAVE_BOOKMARKS](state, item) {
        state.bookmarks.unshift(item);
        storage.setItem('GITHUBER_BOOKMARKS', state.bookmarks);
    },
};

export default {
    actions,
    getters,
    mutations,
    namespaced: true,
    state: {
        bookmarks: [],
    },
};
