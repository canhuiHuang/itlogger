import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  UPDATE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  SEARCH_LOGS,
} from "./types";

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

// export const getLogs = () => {
//   return async (dispatch) => {
//     setLoading();

//     const res = await fetch("/logs");
//     const data = await res.json();

//     dispatch({
//       type: GET_LOGS,
//       payload: data,
//     });
//   };
// };

// Set current log & Clear current log
export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    payload: log,
  };
};
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading();

    await fetch(`/logs/${id}`, { method: "delete" });

    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText,
    });
  }
};

export const addLog = (log) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });

    const config = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(log),
    };
    const res = await fetch("/logs", config);
    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText,
    });
  }
};

export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading();

    console.log(log);
    const config = {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(log),
    };
    const res = await fetch(`/logs/${log.id}`, config);
    const data = await res.json();

    dispatch({
      type: UPDATE_LOG,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText,
    });
  }
};

export const getLogs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch("/logs");
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText,
    });
  }
};

// Search server logs
export const searchLogs = (text) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING,
    });

    const res = await fetch(`/logs?q=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText,
    });
  }
};
