import { createContext, useContext } from 'react';
import { useForm } from '../../hooks/use-form';

const FormContext = createContext(null);

interface IForm {
  initialValues: { [key: string]: string };
  onSubmit: (...params) => void | Promise<void>;
  children: React.ReactNode;
  errors: null | JSX.Element;
}

interface IField {
  label: string;
  'aria-label': string;
  placeholder: string;
  type?: string;
  accept?: string;
}

const Form = ({ initialValues, onSubmit, errors, children }: IForm) => {
  const { values, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit
  });

  return (
    <form onSubmit={handleSubmit}>
      <FormContext.Provider value={{ values, handleChange }}>
        {children}
      </FormContext.Provider>
      {errors}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

const Field = ({
  label,
  'aria-label': ariaLabel,
  placeholder,
  type = 'text',
  accept = 'image/*'
}: IField) => {
  const { values, handleChange } = useContext(FormContext);

  return (
    <div className="mb-3">
      <label htmlFor="email" className="form-label text-capitalize">
        {label}
      </label>
      <input
        autoCapitalize="off"
        autoComplete="off"
        aria-label={ariaLabel}
        className="form-control text-lowercase"
        value={values[name]}
        name={label}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        accept={accept}
      />
    </div>
  );
};

export { Form, Field };
