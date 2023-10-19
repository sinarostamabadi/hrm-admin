import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Field } from "formik";
import {
  Button,
  MyForm,
  Error,
  Input,
  SelectBox,
} from "../../../../../components";
import { createCandidate } from "../../../../../redux/actions/candidate";
import { getDataFromJwtToken } from "../../../../../helpers/get-data-from-jwt";
import { getPersonByPhone } from "../../../../../redux/actions/person";
import { clearFetchedPerson } from "../../../../../redux/reducers/person";
import { getCandidates } from "../../../../../redux/actions/candidate";
import * as Yup from "yup";
import { getAllCandidatePositionStatus } from "../../../../../redux/actions/settings/candidate-position-status";
import { convertArrayToSelectOptions } from "../../../../../helpers/convert-array-to-select-options";
import { changeStatusCandidatePosition } from "../../../../../redux/actions/candidate-position";

export const ChangeStatus = ({
  onCloseModal,
  reFetchData,
  statusData,
  candidatePositionStatus,
}) => {
  // ---------- store ----------
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);

  // ---------- state ----------
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [currentPhone, setCurrentPhone] = useState("");
  const [statusItems, setStatusItems] = useState();
  const [formValue, setFormValue] = useState({
    candidatePositionId: statusData.candidatePositionId,
    candidatePositionStatusId: null,
  });

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- variables ----------

  // ---------- functions ----------
  const reloadPageHandler = (status) => {
    if (status) {
      onCloseModal();
      reFetchData();
    }
    // dispatch(getCandidates({ companyPositionId: companyPositionId }));
  };
  const handleChangeMobile = (value) => {
    setCurrentPhone(value);
    if (value.length >= 10) {
      dispatch(
        getPersonByPhone({
          pageNumber: 0,
          pageSize: 0,
          filters: [
            {
              property: "PhoneNumber",
              operation: 5,
              values: [value],
            },
          ],
        })
      );
    }
  };
  const closeHandler = () => {
    dispatch(clearFetchedPerson());
    onCloseModal();
  };
  const onSubmit = (values) => {
    dispatch(
      changeStatusCandidatePosition(values, (status) =>
        reloadPageHandler(status)
      )
    );
  };

  // ---------- lifeCycle ----------
  useEffect(() => {
    if (candidatePositionStatus) {
      const filteredItems = candidatePositionStatus.filter(
        (candidatePosition) =>
          candidatePosition.parentId === statusData.candidatePositionStatusId
      );
      const selectOptions = convertArrayToSelectOptions(filteredItems, [
        "id",
        "title",
      ]);
      if (statusData.candidateGroup === 3) {
        setStatusItems([
          {
            value: 1,
            label: "Saved",
          },
        ]);
      } else {
        setStatusItems(selectOptions);
      }
    }
  }, [candidatePositionStatus]);

  //   useEffect(() => {
  //     if (personData.length > 0) {
  //       setIsInputDisabled(false);
  //       setFormValue((prevValues) => ({
  //         ...prevValues,
  //         personId: personData[0].id,
  //         name: personData[0].firstName,
  //         family: personData[0].lastName,
  //         phoneNumber: personData[0].phoneNumber,
  //         email: personData[0].email,
  //       }));
  //     }
  //     if (personData.length === 0) {
  //       setFormValue({
  //         tenantId: +getDataFromJwtToken("TenantId"),
  //         personId: null,
  //         companyPositionId: companyPositionId,
  //         name: "",
  //         family: "",
  //         phoneNumber: currentPhone,
  //         email: "",
  //         isApproved: false,
  //         isOnBlackList: false,
  //         blacklistReason: "",
  //         description: "",
  //         relatedUserId: 0,
  //         startPeriod: "",
  //         totalITExperience: "",
  //         totalITExperienceMonth: "",
  //       });
  //       setIsInputDisabled(false);
  //     }
  //   }, [personData]);

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 select-none border-b border-custom-gray-light">
        <h4 className="text-18 font-bold">{t("page_title.change_status")}</h4>
        <div className="cursor-pointer" onClick={closeHandler}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.5"
              x="6"
              y="17.3137"
              width="16"
              height="2"
              rx="1"
              transform="rotate(-45 6 17.3137)"
              fill="currentColor"
            />
            <rect
              x="7.41422"
              y="6"
              width="16"
              height="2"
              rx="1"
              transform="rotate(45 7.41422 6)"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <div className="p-4 flex justify-between">
        <p className="text-14">
          <span className="text-custom-gray-muted">{t("text.name")}:</span>{" "}
          {statusData.name}
        </p>
        <p className="text-14">
          <span className="text-custom-gray-muted">{t("text.family")}:</span>{" "}
          {statusData.family}
        </p>
        <p className="text-14">
          <span className="text-custom-gray-muted">{t("text.email")}:</span>{" "}
          {statusData.email}
        </p>
      </div>
      <MyForm
        initialValues={formValue}
        submit={onSubmit}
        classes="flex flex-col gap-y-10 p-4 select-none"
      >
        <div className="flex flex-col gap-y-4">
          <div className="w-full flex gap-4">
            <div className="w-1/2">
              <label className="text-14 font-medium">
                {t("input.current_status")}
              </label>
              <div className="w-max h-9 leading-9 px-2 rounded-md text-14 bg-custom-gray-light text-custom-gray-muted mt-2">
                {statusData.candidatePositionStatus.title}
              </div>
            </div>
            <div className="w-1/2">
              <Field
                component={SelectBox}
                label={t("input.choose_status")}
                name="candidatePositionStatusId"
                options={statusItems}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex gap-x-2 items-center justify-end">
          <div className="flex items-center gap-x-2">
            <Field
              component={Button}
              title={t("button.save_title")}
              loading={isLoading}
              type="submit"
              theme="dark"
            />
          </div>
        </div>
      </MyForm>
    </>
  );
};
