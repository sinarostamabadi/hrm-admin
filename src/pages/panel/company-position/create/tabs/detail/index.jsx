import { Field } from "formik";
import { Checkbox, Input, SelectBox } from "../../../../../../components";
import { useTranslation } from "react-i18next";

export const Detail = ({ selectOptions, cityLoading }) => {
  // ---------- hooks ----------
  const { t } = useTranslation();

  // ---------- render jsx ----------
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={Input}
            name="responsibleMan"
            placeholder={t("input.responsible_man.placeholder")}
            label={t("input.responsible_man.label")}
          />
        </div>
        <div className="w-1/2">
          <Field
            component={Input}
            name="salaryRange"
            placeholder={t("input.salary_range.placeholder")}
            label={t("input.salary_range.label")}
          />
        </div>
      </div>
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={SelectBox}
            name="cityId"
            placeholder={t("input.city.placeholder")}
            label={t("input.city.label")}
            options={selectOptions.city}
            loading={cityLoading}
          />
        </div>
        <div className="w-1/2">
          <Field
            component={Input}
            name="closingDate"
            placeholder={t("input.closing_date.placeholder")}
            label={t("input.closing_date.label")}
            // onChange={(val) => handleOnChange(val)}
          />
        </div>
      </div>
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={SelectBox}
            name="workModeId"
            placeholder={t("input.work_mode.placeholder")}
            label={t("input.work_mode.label")}
            options={selectOptions.workMode}
          />
        </div>
        <div className="w-1/2">
          <Field
            component={SelectBox}
            name="workTypeId"
            placeholder={t("input.work_type.placeholder")}
            label={t("input.work_type.label")}
            options={selectOptions.workType}
          />
        </div>
      </div>
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={Input}
            placeholder={t("input.closing_suspending_reason.placeholder")}
            label={t("input.closing_suspending_reason.label")}
            name="closingOrSuspendingReason"
          />
        </div>
      </div>
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={Input}
            type="textarea"
            placeholder={t("input.position_detail.placeholder")}
            label={t("input.position_detail.label")}
            name="positionDetial"
          />
        </div>
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
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={Checkbox}
            label={t("input.exist_on_kariyer.label")}
            name="existOnKariyer"
          />
        </div>
        <div className="w-1/2">
          <Field
            component={Checkbox}
            label={t("input.exist_on_linkedin.label")}
            name="existOnLinkedIn"
          />
        </div>
      </div>
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={Checkbox}
            label={t("input.is_active.label")}
            name="isActive"
          />
        </div>
        <div className="w-1/2">
          <Field
            component={Checkbox}
            label={t("input.is_on_black_list.label")}
            name="isOnBlackList"
          />
        </div>
      </div>
      <div className="flex gap-x-8">
        <div className="w-1/2">
          <Field
            component={Checkbox}
            label={t("input.is_closed.label")}
            name="isClosed"
          />
        </div>
      </div>
    </div>
  );
};
