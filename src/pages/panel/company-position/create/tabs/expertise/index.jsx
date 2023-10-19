import { ClipLoader } from "react-spinners";
import { SearchBox } from "../../../../../../components";
import { useTranslation } from "react-i18next";

export const Expertise = ({
  onSearch,
  onSelect,
  onDeSelect,
  expertisesSelected,
  expertisesFilter,
  expertiseData,
  expertiseLoading,
}) => {
  // ---------- hooks ----------
  const { t } = useTranslation();

  // ---------- render jsx ----------
  return (
    <>
      <SearchBox
        placeholder={t("input.search.placeholder")}
        onChange={(value) => onSearch(value, "expertise")}
      />
      <div className="flex items-center flex-wrap gap-5 mt-10">
        {expertisesSelected.map((expertiseSelect) => (
          <div
            className="p-3 bg-custom-gray-muted rounded-xl cursor-pointer text-14 text-white"
            onClick={() => onDeSelect(expertiseSelect.id, "expertise")}
          >
            {expertiseSelect.title}
          </div>
        ))}
      </div>
      <div className="flex items-center flex-wrap gap-5 mt-8">
        {expertiseData && !expertiseLoading ? (
          expertisesFilter.map((expertise) =>
            expertisesSelected.findIndex(
              (expertiseSelect) => expertiseSelect.id === expertise.id
            ) === -1 ? (
              <div
                className="p-3 bg-custom-gray-light rounded-xl cursor-pointer text-14"
                onClick={() => onSelect(expertise, "expertise")}
              >
                {expertise.title}
              </div>
            ) : (
              <div className="p-3 bg-custom-gray-light rounded-xl cursor-default text-14 opacity-50">
                {expertise.title}
              </div>
            )
          )
        ) : (
          <ClipLoader color="#FE6601" className="w-full mx-auto" />
        )}
      </div>
    </>
  );
};
