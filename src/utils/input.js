import { useField } from 'formik';

export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col w-full relative">
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

export const MyCheckbox = ({ children, ...props }) => {
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
