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
          className="relative text-input w-full h-32 border rounded py-[10px] px-[14px] border-[#CDD1D0] focus:outline-none focus:border-b focus:border-b-[#BA9FFE]"
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

