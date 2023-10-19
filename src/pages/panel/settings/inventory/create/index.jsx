import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Field } from "formik";
import { getDataFromJwtToken } from "../../../../../helpers/get-data-from-jwt";
import {
  Button,
  MyForm,
  Error,
  Input,
  SelectBox,
  Checkbox,
} from "../../../../../components";
import { createInventory } from "../../../../../redux/actions/settings/inventory";
import { getInventoryTypes } from "../../../../../redux/actions/settings/inventory-type";
import { convertArrayToSelectOptions } from "../../../../../helpers/convert-array-to-select-options";
import * as Yup from "yup";

export const CreateInventory = () => {
  // ---------- store ----------
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);
  const inventoryTypeData = useSelector(
    (state) => state.inventoryTypeSlice.info
  );

  // ---------- state ----------
  const [inventoryTypeOptions, setInventoryTypeOptions] = useState();

  // ---------- hooks ----------
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ---------- variables ----------
  const initialFormValue = {
    tenantId: getDataFromJwtToken("TenantId"),
    inventoryTypeId: null,
    serialNumber: "",
    model: "",
    brand: "",
    inventoryNumber: "",
    purchasedLocationAndDate: "",
    windowsPassword: "",
    windows: "",
    virusProgramPassword: "",
    virusProgram: "",
    officeProgramKey: "",
    officeProgram: "",
    passwordHint: "",
    windowsUserPassword: "",
    windowsUsername: "",
  };
  const dataSchema = Yup.object({
    serialNumber: Yup.string().required(t("error.serial_number_required")),
  });

  // ---------- functions ----------
  const onSubmit = (values) => {
    dispatch(createInventory(values, navigate));
  };

  // ---------- functions ----------
  useEffect(() => {
    dispatch(getInventoryTypes({}));
  }, []);
  useEffect(() => {
    if (inventoryTypeData.count) {
      const options = convertArrayToSelectOptions(inventoryTypeData.data, [
        "id",
        "title",
      ]);
      setInventoryTypeOptions(options);
    }
  }, [inventoryTypeData]);

  // ---------- render jsx ----------
  return (
    <div className="pb-8">
      <MyForm
        initialValues={initialFormValue}
        validation={dataSchema}
        submit={onSubmit}
        classes="flex flex-col gap-y-8 p-4 pb-20 bg-white rounded-lg"
      >
        <div className="flex items-center justify-between p-4">
          <h4 className="text-18 font-bold dark:text-dark_custom-full-white">
            {t("page_title.create_inventory")}
          </h4>
        </div>
        <div className="flex flex-col gap-y-8">
          <div className="flex gap-x-8">
            <div className="w-1/2">
              <Field
                component={SelectBox}
                placeholder={t("input.inventory_type.placeholder")}
                label={t("input.inventory_type.label")}
                options={inventoryTypeOptions}
                name="inventoryTypeId"
              />
            </div>
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.serial_number.placeholder")}
                label={t("input.serial_number.label")}
                name="serialNumber"
              />
              <Error name="serialNumber"/>
            </div>
          </div>
          <div className="flex  gap-x-8">
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.model.placeholder")}
                label={t("input.model.label")}
                name="model"
              />
            </div>
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.brand.placeholder")}
                label={t("input.brand.label")}
                name="brand"
              />
            </div>
          </div>
          <div className="flex  gap-x-8">
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.inventory_number.placeholder")}
                label={t("input.inventory_number.label")}
                name="inventoryNumber"
              />
            </div>
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.purchased_location_and_date.placeholder")}
                label={t("input.purchased_location_and_date.label")}
                name="purchasedLocationAndDate"
              />
            </div>
          </div>
          <div className="flex  gap-x-8">
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.windows.placeholder")}
                label={t("input.windows.label")}
                name="windows"
              />
            </div>
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.windows_password.placeholder")}
                label={t("input.windows_password.label")}
                name="windowsPassword"
              />
            </div>
          </div>
          <div className="flex  gap-x-8">
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.virus_program.placeholder")}
                label={t("input.virus_program.label")}
                name="virusProgram"
              />
            </div>
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.virus_program_password.placeholder")}
                label={t("input.virus_program_password.label")}
                name="virusProgramPassword"
              />
            </div>
          </div>
          <div className="flex  gap-x-8">
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.office_program.placeholder")}
                label={t("input.office_program.label")}
                name="officeProgram"
              />
            </div>
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.office_program_key.placeholder")}
                label={t("input.office_program_key.label")}
                name="officeProgramKey"
              />
            </div>
          </div>
          <div className="flex  gap-x-8">
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.windows_username.placeholder")}
                label={t("input.windows_username.label")}
                name="windowsUsername"
              />
            </div>
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.windows_user_password.placeholder")}
                label={t("input.windows_user_password.label")}
                name="windowsUserPassword"
              />
            </div>
          </div>
          <div className="flex  gap-x-8">
            <div className="w-1/2">
              <Field
                component={Input}
                placeholder={t("input.password_hint.placeholder")}
                label={t("input.password_hint.label")}
                name="passwordHint"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-2">
          <Field
            component={Button}
            title={t("button.back_title")}
            type="button"
            theme="light"
            onClick={() => navigate("/inventory")}
          />
          <Field
            component={Button}
            title={t("button.save_title")}
            loading={isLoading}
            type="submit"
            theme="dark"
            classes="px-10"
          />
        </div>
      </MyForm>
    </div>
  );
};
