import { ClipLoader } from "react-spinners";
import { SearchBox } from "../../../../../../components";
import { useTranslation } from "react-i18next";

export const Feature = ({
  onSearch,
  onSelect,
  onDeSelect,
  featuresSelected,
  featuresFilter,
  featureData,
  featureLoading,
}) => {
  // ---------- hooks ----------
  const { t } = useTranslation();

  // ---------- render jsx ----------
  return (
    <>
      <SearchBox
        placeholder={t("input.search.placeholder")}
        onChange={(value) => onSearch(value, "feature")}
      />
      <div className="flex items-center flex-wrap gap-5 mt-10">
        {featuresSelected.map((featureSelect) => (
          <div
            className="p-3 bg-custom-gray-muted rounded-xl cursor-pointer text-14 text-white"
            onClick={() => onDeSelect(featureSelect.id, "feature")}
          >
            {featureSelect.title}
          </div>
        ))}
      </div>
      <div className="flex items-center flex-wrap gap-5 mt-8">
        {featureData && !featureLoading ? (
          featuresFilter.map((feature) =>
            featuresSelected.findIndex(
              (featureSelect) => featureSelect.id === feature.id
            ) === -1 ? (
              <div
                className="p-3 bg-custom-gray-light rounded-xl cursor-pointer text-14"
                onClick={() => onSelect(feature, "feature")}
              >
                {feature.title}
              </div>
            ) : (
              <div className="p-3 bg-custom-gray-light rounded-xl cursor-default text-14 opacity-50">
                {feature.title}
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
