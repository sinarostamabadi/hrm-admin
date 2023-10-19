import { api } from "../../../api";
import axios from "axios";
import { startLoading, endLoading } from "../../reducers/ui/loading";
import {
  setInfo,
  setEditInfo,
  setLoading,
  setCount,
} from "../../reducers/employee";
import {
  errorNotification,
  successNotification,
} from "../../../helpers/notification";
import { t } from "i18next";

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.token,
};
export const getEmployees = (options) => (dispatch) => {
  dispatch(startLoading());
  dispatch(setLoading(true));
  axios
    .post(api.EmployeeApi.getEmployee, options, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        dispatch(setInfo(res.data.data));
        dispatch(setCount(res.data.count));
        dispatch(endLoading());
        dispatch(setLoading(false));
      } else {
        dispatch(endLoading());
        dispatch(setLoading(false));
      }
    })
    .catch(() => {
      dispatch(endLoading());
      dispatch(setLoading(false));
    });
};

export const createEmployee = (data, setStatus) => (dispatch) => {
  dispatch(startLoading());
  axios
    .post(api.EmployeeApi.createEmployee, data, { headers })
    .then((res) => {
      if (res.data.statusCode === "200") {
        successNotification(t("toast.success"));
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

export const getByIdEmployee = (id) => (dispatch) => {
  axios
    .get(api.EmployeeApi.getEmployee + id, { headers })
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

export const editEmployee = (id, data, navigate) => (dispatch) => {
  dispatch(startLoading());
  axios
    .put(api.EmployeeApi.editEmployee + id, data, { headers })
    .then((res) => {
      console.log(res);
      if (res.data.statusCode === "200") {
        dispatch(endLoading());
        successNotification(t("toast.success"));
        navigate("/employee");
        // setStatus(true)
      } else {
        dispatch(endLoading());
        errorNotification(t("toast.error"));
        // setStatus(true)
      }
    })
    .catch(() => {
      dispatch(endLoading());
      errorNotification(t("toast.error"));
      //   setStatus(true)
    });
};

// export const getSuggestionPerson = (options, setData, setStatus) => {
//   setStatus(true);
//   axios
//     .post(api.SettingsApi.getPersonSuggestion, options, { headers })
//     .then((res) => {
//       if (res.data.statusCode === "200") {
//         setStatus(false);
//         setData(res.data.data);
//       } else {
//         setStatus(false);
//       }
//     })
//     .catch(() => {
//       setStatus(false);
//     });
// };
