import { api } from "../../../../api";
import axios from "axios";
import { endLoading, startLoading } from "../../../reducers/ui/loading";
import { setEditInfo, setInfo, setLoading } from "../../../reducers/settings/feature";
import {
  errorNotification,
  successNotification,
} from "../../../../helpers/notification";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};

export const getFeatures = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.SettingsApi.getFeatures, options, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
    });
};

export const createFeature = (data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.SettingsApi.createFeature, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
        dispatch(endLoading());
        setStatus(true)
      } else {
        errorNotification(t("toast.error"));
        dispatch(endLoading());
        setStatus(true)
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
      dispatch(endLoading());
      setStatus(true)
    });
};

export const getByIdFeature = (id) => (dispatch) => {
  axios
    .get(api.SettingsApi.getFeature + id, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setEditInfo(res.data.data));
      } else {
        errorNotification(t("toast.error"));
      }
    })
    .catch(() => {
      errorNotification(t("toast.error"));
    });
};

export const editFeature = (id, data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .put(api.SettingsApi.editFeature + id, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        successNotification(t("toast.success"));
        setStatus(true)
      } else {
        dispatch(endLoading());
        errorNotification(t("toast.error"));
        setStatus(true)
      }
    })
    .catch(() => {
      dispatch(endLoading());
      errorNotification(t("toast.error"));
      setStatus(true)
    });
};
