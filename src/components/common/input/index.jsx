export const Input = ({
  field,
  placeholder,
  label,
  type = "text",
  classes,
  disabled,
  onChange,
  readOnly = false,
}) => {
  // ---------- render jsx ----------
  return (
    <>
      {type === "textarea" ? (
        <div>
          <label className="text-14 text-custom-dark font-medium capitalize dark:text-dark_custom-full-white">
            {label}
          </label>
          <textarea
            {...field}
            className={`w-full bg-white resize-none border border-custom-gray rounded-md text-16 disabled:bg-slate-100 placeholder:text-14 text-custom-dark p-2 mt-2 outline-none ${classes} dark:bg-dark_custom-average-black dark:placeholder:text-dark_custom-full-white dark:text-dark_custom-full-white`}
            placeholder={placeholder}
            rows={5}
            disabled={disabled}
            readOnly={readOnly}
          />
        </div>
      ) : (
        <div className="w-full">
          <label className="text-14 text-custom-dark font-medium capitalize dark:text-dark_custom-full-white">
            {label}
          </label>
          <input
            {...field}
            type={type}
            onKeyUp={(e) => onChange && onChange(e.target.value)}
            placeholder={placeholder}
            className={`w-full h-10 bg-white rounded-md border read-only:bg-slate-50 read-only:cursor-default border-custom-gray disabled:bg-slate-100 text-custom-dark text-14 placeholder:text-14 placeholder:text-custom-gray-muted p-2 outline-none dark:bg-dark_custom-average-black dark:placeholder:text-dark_custom-full-white dark:text-dark_custom-full-white ${classes} : ${
              label && "mt-2"
            }`}
            disabled={disabled}
            readOnly={readOnly}
          />
        </div>
      )}
    </>
  );
};
