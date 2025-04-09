import { takeLatest, put, call } from 'redux-saga/effects';
import { fetchItems, insertItem, updateItem, deleteItem } from '../utils/database';
import { setItems, loadItems, addItem, editItem, removeItem } from '../store/itemsSlice';

function* handleLoadItems() {
    try {
        const items = yield call(fetchItems);
        yield put(setItems(items));
    } catch (error) {
        console.error('[Saga] loadItems failed:', error);
    }
}

function* handleAddItem(action) {
    try {
        yield call(insertItem, action.payload);
        yield call(handleLoadItems);
    } catch (error) {
        console.error('[Saga] addItem failed:', error);
    }
}

function* handleEditItem(action) {
    try {
        yield call(updateItem, action.payload);
        yield call(handleLoadItems);
    } catch (error) {
        console.error('[Saga] editItem failed:', error);
    }
}

function* handleRemoveItem(action) {
    try {
        yield call(deleteItem, action.payload);
        yield call(handleLoadItems);
    } catch (error) {
        console.error('[Saga] removeItems failed:', error);
    }
}

export default function* itemsSaga() {
    yield takeLatest(loadItems.type, handleLoadItems);
    yield takeLatest(addItem.type, handleAddItem);
    yield takeLatest(editItem.type, handleEditItem);
    yield takeLatest(removeItem.type, handleRemoveItem);
}