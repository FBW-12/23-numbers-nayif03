// import saga
import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
    yield takeLatest("API_REQUEST", workerSaga);
}

// function that makes the api request and returns a Promise for response
function FetchInfo(number) {
    return axios({
        method: "get",
        url: `https://numbers-api-proxy.dci-fbw121.now.sh/?number=${number}`
    });
}

// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(action) {
    try {
        
        const response = yield call(FetchInfo,action.number);
        const info = response.data;
        // dispatch a success action to the store with the new dog
        yield put({ type: "API_REQUEST_SUCCESS", info});

    } catch (error) {
        // dispatch a failure action to the store with the error
        yield put({ type: "API_REQUEST_FAILURE", error });
    }
}