import {
  GET_TECHS,
  SET_LOADING,
  TECHS_ERROR,
  ADD_TECH,
  DELETE_TECH,
} from "../actions/types";

export const getTechs = () => async (dispatch) => {
  try {
    setLoading();

    const res = await fetch("/techs");
    const data = await res.json();

    console.log(data);

    dispatch({
      type: GET_TECHS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.statusText,
    });
  }
};

export const addTech = (tech) => async (dispatch) => {
  try {
    setLoading();

    const config = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tech),
    };

    const res = await fetch("/techs", config);
    const data = await res.json();

    dispatch({
      type: ADD_TECH,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.statusText,
    });
  }
};

export const deleteTech = (id) => async (dispatch) => {
  try {
    setLoading();

    await fetch(`/techs/${id}`, { method: "delete" });

    dispatch({
      type: DELETE_TECH,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.statusText,
    });
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
