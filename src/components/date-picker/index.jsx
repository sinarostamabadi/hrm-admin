import DatePicker from "react-datepicker";
import { FcCalendar } from "react-icons/fc";
import "react-datepicker/dist/react-datepicker.css";

export const CustomDatePicker = ({
  field,
  classes,
  label,
  selected,
  onChange,
}) => {
  // ---------- render jsx ----------
  return (
    <div className="w-full">
      <label className="text-14 text-custom-dark font-medium capitalize block">
        {label}
      </label>
      <DatePicker
        {...field}
        showIcon
        autoComplete="off"
        selected={selected}
        onChange={(date) => onChange(date)}
        className={`w-full h-10 cursor-pointer bg-white rounded-md border border-custom-gray pl-10 disabled:bg-slate-100 text-custom-dark text-14 placeholder:text-14 placeholder:text-custom-gray-muted outline-none ${classes} ${
          label && "mt-2.5"
        }`}
        wrapperClassName="w-full"
        todayButton="Today"
        showPopperArrow={false}
        icon={
          <span className="mt-3 pointer-events-none">
            <FcCalendar size={19} />
          </span>
        }
      />
    </div>
  );
};
