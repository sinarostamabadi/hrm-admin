import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
import { Field } from "formik";
import {
  Button,
  MyForm,
  Error,
  Input,
  SelectBox,
} from "../../../../components";
import {
  getByIdCompanyProject,
  editCompanyProject,
} from "../../../../redux/actions/company-project";
import * as Yup from "yup";
import {
  getCompanies,
  getByIdCompany,
} from "../../../../redux/actions/company";
import { convertArrayToSelectOptions } from "../../../../helpers/convert-array-to-select-options";

export const EditCompanyProject = ({ onCloseModal, isReloadPage, editId }) => {
  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // ---------- store ----------
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);
  const editInfo = useSelector((state) => state.companyProjectSlice.editInfo);
  const { info: companyData, editInfo: fetchedCompany } = useSelector(
    (state) => state.companySlice
  );

  // ---------- state ----------
  const [companyOptions, setCompanyOptions] = useState();
  const [companyItem, setCompanyItem] = useState();
  const [data, setData] = useState({
    id: null,
    tenantId: null,
    companyId: null,
    title: "",
    description: "",
  });

  // ---------- variables ----------
  const companyProjectDataSchema = Yup.object({
    companyId: Yup.string().required(t("error.company_id_required")),
    title: Yup.string().required(t("error.title_required")),
  });

  // ---------- functions ----------
  const reloadPageHandler = (status) => {
    if (status) {
      onCloseModal();
      isReloadPage();
    }
  };
  const onSubmit = (values) => {
    dispatch(
      editCompanyProject(editId, values, (status) => reloadPageHandler(status))
    );
  };

  // ---------- lifeCycle ----------
  useEffect(() => {
    dispatch(getByIdCompanyProject(editId));
    dispatch(getCompanies({}));
  }, []);
  useEffect(() => {
    if (editInfo) {
      setData({
        id: editId,
        tenantId: editInfo.tenantId,
        companyId: editInfo.companyId,
        title: editInfo.title,
        description: editInfo.description,
      });
      dispatch(getByIdCompany(editInfo.companyId));
      setCompanyItem({ id: fetchedCompany.id, label: fetchedCompany.title });
    }
  }, [editInfo]);
  useEffect(() => {
    if (companyData.count) {
      const options = convertArrayToSelectOptions(companyData.data, [
        "id",
        "title",
      ]);
      setCompanyOptions(options);
    }
  }, [companyData]);

  // ---------- render jsx ----------
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-custom-gray-light dark:bg-dark_custom-average-black">
        <h4 className="text-18 font-bold dark:text-dark_custom-full-white">
          {t("page_title.edit_company_project")}
        </h4>
        <div className="cursor-pointer dark:text-dark_custom-full-white" onClick={onCloseModal}>
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
      <MyForm
        initialValues={data}
        validation={companyProjectDataSchema}
        submit={onSubmit}
        classes="flex flex-col gap-y-10 p-4"
      >
        <div className="flex flex-col gap-y-4">
          <div className="flex items-start gap-x-4">
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.title.placeholder")}
                label={t("input.title.label")}
                name="title"
              />
              <Error name="title" />
            </div>
            <div className="w-1/2">
              <Field
                component={SelectBox}
                options={companyOptions}
                selectedOption={companyItem}
                name="companyId"
                placeholder={t("input.company.placeholder")}
                label={t("input.company.label")}
              />
              <Error name="companyId" />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-1/2">
              <Field
                component={Input}
                type="textarea"
                placeholder={t("input.description.placeholder")}
                label={t("input.description.label")}
                name="description"
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
