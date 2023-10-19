import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select, { components } from "react-select";

// ++++++++++ images import ++++++++++
import ArrowIcon from "../../../assets/images/down.png";

const NoOptionsMessage = (props) => {
  // ---------- hooks ----------
  const { t } = useTranslation();

  return (
    <components.NoOptionsMessage {...props}>
      <span className="text-14 text-custom-gray-muted">
        {t("select.no_options_message")}
      </span>
    </components.NoOptionsMessage>
  );
};

export const SelectBox = ({
  field,
  form,
  label,
  placeholder,
  options,
  selectedOption,
  onChangeHandler,
  loading = false,
}) => {
  // ---------- states ----------
  const [option, setOption] = useState();

  // ---------- variables ----------
  const customStyles = {
    control: (
      provided,
      state
      // props: ControlProps<ISelectOption, boolean, GroupBase<any>>
    ) => ({
      ...provided,
      borderColor: "#e5e7eb !important",
      borderRadius: "6px",
      height: "40px",
      cursor: "pointer",
      fontSize: "14px",
      backgroundColor: !!options?.length ? "#fff" : "#F2F2F2",
      boxShadow: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#99a1b7",
      fontSize: 14,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      cursor: "pointer",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      pointerEvents: "auto",
      cursor: "pointer",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "gray" : "black",
      backgroundColor: state.isSelected ? "#EFEFEF" : "white",
      cursor: "pointer",
      outline: "none",
      zIndex: "50",
      overflow: "hidden",
      fontSize: 14,
    }),
  };
  const { name } = field;
  const { setFieldValue } = form;

  // ---------- functions ----------
  const handleChange = (selected) => {
    setFieldValue(name, selected.value);
    setOption(selected);
    onChangeHandler && onChangeHandler(selected);
  };

  // ---------- lifeCycle ----------
  useEffect(() => {
    if (selectedOption) {
      setOption(selectedOption);
    }
  }, [selectedOption]);

  // ---------- render jsx ----------
  return (
    <div className="flex flex-col gap-y-2 w-full">
      {label && (
        <label className="text-14 text-custom-dark font-medium mb-0.5 capitalize dark:text-dark_custom-full-white">
          {label}
        </label>
      )}
      <Select
        className="my-react-select-container"
        classNamePrefix="my-react-select"
        options={options}
        isSearchable={false}
        styles={customStyles}
        placeholder={placeholder}
        onChange={handleChange}
        value={option}
        maxMenuHeight={200}
        components={{ NoOptionsMessage }}
        isLoading={loading}
        isDisabled={!!options?.length ? false : true}
      />
    </div>
  );
};
