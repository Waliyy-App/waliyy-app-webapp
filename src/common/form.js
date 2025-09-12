import { useField } from 'formik';

export const TextInput = ({ label, classname, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={`flex flex-col w-full relative ${classname}`}>
      <label
        className="text-sm font-medium mb-2 text-[#2D133A]"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <div className="w-full">
        <input
          className="relative text-input w-full h-11 border-b border-b-[#CDD1D0] focus:outline-none focus:border-b focus:border-b-[#BA9FFE]"
          {...field}
          {...props}
        />
      </div>

      {meta.touched && meta.error ? (
        <div className="error text-red-600 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const CheckboxInput = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div className="flex flex-col mt-3">
      <label className="checkbox-input flex items-center text-sm font-medium">
        <input className="mr-2" type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error text-red-600 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const CheckboxInputTwo = ({ children, ...props }) => {
  const [field] = useField({ ...props, type: 'checkbox' });
  return (
    <div className="flex flex-col mt-3">
      <label className="checkbox-input flex items-center text-sm font-medium">
        <input className="mr-2" type="checkbox" {...field} {...props} />
        {children}
      </label>
    </div>
  );
};

export const SelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={`flex flex-col w-full relative`}>
      <label
        className="text-sm font-medium mb-2 text-[#2D133A]"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <select
        className="relative text-input w-full h-11 border-b border-b-[#CDD1D0] focus:outline-none focus:border-b focus:border-b-[#BA9FFE]"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error text-red-600 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const TextArea = ({ label, classname, ...props }) => {
  const [field, meta] = useField(props);

  const charCount = field.value ? field.value.length : 0;
  const minChars = props.minChars || 100; // 👈 fallback if not passed

  const isBelowMin = charCount < minChars;

  return (
    <div className={`flex flex-col w-full relative ${classname}`}>
      <label
        className="text-sm font-medium mb-2 text-[#2D133A]"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>

      <div className="w-full">
        <textarea
          className="relative text-input w-full border rounded py-[10px] px-[14px] border-[#CDD1D0] focus:outline-none focus:border-b focus:border-b-[#BA9FFE]"
          {...field}
          {...props}
        />
      </div>

      {/* ✅ Character counter */}
      <div
        className={`text-xs mt-1 ${
          isBelowMin ? "text-red-500" : "text-green-600"
        }`}
      >
        {charCount} / {minChars} characters
      </div>

      {/* ✅ Validation error */}
      {meta.touched && meta.error ? (
        <div className="error text-red-600 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
};