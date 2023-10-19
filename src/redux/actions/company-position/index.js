import axios from "axios";
import { api } from "../../../api";
import { startLoading, endLoading } from "../../reducers/ui/loading";
import {
  successNotification,
  errorNotification,
} from "../../../helpers/notification";
import { setInfo, setEditInfo, setLoading } from "../../reducers/company-position"
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token
};
export const getCompanyPositions = (options) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.CompanyPositionApi.getCompanyPositions, options, { headers })
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

export const createCompanyPosition = (data, navigate) => (dispatch) => {
  dispatch(setLoading(true));
  axios
    .post(api.CompanyPositionApi.createCompanyPosition, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setLoading(false));
        successNotification(t("notification.data_success"));
        navigate("/companyPosition", { state: { companyId: res.data.data.companyId } });
      } else {
        dispatch(setLoading(false));
      }
    })
    .catch(() => {
      dispatch(setLoading(false));
    });
};

export const getByIdCompanyPosition = (id, np) => (dispatch) => {
  dispatch(startLoading());
  axios
    .get(api.CompanyPositionApi.getCompanyPosition + id + `?includeProperties=${np}`, { headers })
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

export const editCompanyPosition = (id, data, navigate) => (dispatch) => {
  console.log(data);
  dispatch(startLoading());
  axios
    .put(api.CompanyPositionApi.editCompanyPosition + id, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        successNotification(t("notification.data_success"));
        navigate("/companyPosition", { state: { companyId: res.data.data.companyId } });
      } else {
        dispatch(endLoading());
      }
    })
    .catch(() => {
      dispatch(endLoading());
    });
};
