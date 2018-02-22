'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// General
const SELECT_LIST = exports.SELECT_LIST = 'app/List/SELECT_LIST';
const SET_CURRENT_PAGE = exports.SET_CURRENT_PAGE = 'app/List/SET_CURRENT_PAGE';
const INITIAL_LIST_LOAD = exports.INITIAL_LIST_LOAD = 'app/List/INITIAL_LIST_LOAD';
// Items
const LOAD_ITEMS = exports.LOAD_ITEMS = 'app/List/LOAD_ITEMS';
const ITEMS_LOADED = exports.ITEMS_LOADED = 'app/List/ITEMS_LOADED';
const ITEM_LOADING_ERROR = exports.ITEM_LOADING_ERROR = 'app/List/ITEM_LOADING_ERROR';
// Active
const SET_ACTIVE_SEARCH = exports.SET_ACTIVE_SEARCH = 'app/List/SET_ACTIVE_SEARCH';
const SET_ACTIVE_SORT = exports.SET_ACTIVE_SORT = 'app/List/SET_ACTIVE_SORT';
const SET_ACTIVE_COLUMNS = exports.SET_ACTIVE_COLUMNS = 'app/List/SET_ACTIVE_COLUMNS';
const SET_ACTIVE_LIST = exports.SET_ACTIVE_LIST = 'app/List/SET_ACTIVE_LIST';
// Filtering
const ADD_FILTER = exports.ADD_FILTER = 'app/List/ADD_FILTER';
const CLEAR_FILTER = exports.CLEAR_FILTER = 'app/List/CLEAR_FILTER';
const CLEAR_ALL_FILTERS = exports.CLEAR_ALL_FILTERS = 'app/List/CLEAR_ALL_FILTERS';
const SET_FILTERS = exports.SET_FILTERS = 'app/List/SET_FILTERS';
// Drag
const SET_ROW_ALERT = exports.SET_ROW_ALERT = 'app/List/SET_ROW_ALERT';
const RESET_DRAG_PAGE = exports.RESET_DRAG_PAGE = 'app/List/RESET_DRAG_PAGE';
const RESET_DRAG_ITEMS = exports.RESET_DRAG_ITEMS = 'app/List/RESET_DRAG_ITEMS';
const SET_DRAG_ITEM = exports.SET_DRAG_ITEM = 'app/List/SET_DRAG_ITEM';
const SET_DRAG_INDEX = exports.SET_DRAG_INDEX = 'app/List/SET_DRAG_INDEX';
const DRAG_MOVE_ITEM = exports.DRAG_MOVE_ITEM = 'app/List/DRAG_MOVE_ITEM';