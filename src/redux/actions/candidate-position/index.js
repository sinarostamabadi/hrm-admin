import { api } from "../../../api";
import axios from "axios";
import {
  setInfo,
  setLoading,
  setEditInfo,
} from "../../reducers/candidate-position";
import { endLoading, startLoading } from "../../reducers/ui/loading";
import {
  errorNotification,
  successNotification,
} from "../../../helpers/notification";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};

export const getCandidatePosition = (options) => (dispatch) => {
  // dispatch(startLoading());
  dispatch(setLoading(true));
  axios
    .post(api.CandidatePositionApi.getCandidatePosition, options, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data.data));
        // dispatch(endLoading());
        dispatch(setLoading(false));
      } else {
        // dispatch(endLoading());
        dispatch(setLoading(false));
      }
    })
    .catch(() => {
      // dispatch(endLoading());
      dispatch(setLoading(false));
    });
};

export const createCandidatePosition = (data) => (dispatch) => {
  dispatch(startLoading());

  axios
    .post(api.CandidatePositionApi.createCandidatePosition, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        dispatch(endLoading());
      } else {
        errorNotification(t("toast.error"));
        dispatch(endLoading());
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(endLoading());
    });
};

export const getByIdCandidatePosition = (id) => (dispatch) => {
  dispatch(startLoading());
  axios
    .get(api.CandidatePositionApi.getCandidatePosition + id, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data.data));
        dispatch(endLoading());
      } else {
        dispatch(endLoading());
      }
    })
    .catch((err) => {
      dispatch(endLoading());
    });
};
export const changeStatusCandidatePosition =
  (data, setStatus) => (dispatch) => {
    dispatch(startLoading());
    axios
      .post(api.CandidatePositionApi.changeStatusCandidatePosition, data, {
        headers,
      })
      .then((res) => {
        if (res.data.statusCode === "200") {
          dispatch(endLoading());
          setStatus(true);
        } else {
          errorNotification(t("toast.error"));
          dispatch(endLoading());
          setStatus(true);
        }
      })
      .catch(() => {
        errorNotification(t("toast.error"));
        dispatch(endLoading());
        setStatus(true);
      });
  };
