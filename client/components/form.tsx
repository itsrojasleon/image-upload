import { useForm } from '../hooks/use-form';

interface Props {
  initialValues: { [key: string]: string };
  onSubmit: () => void | Promise<void>;
  errors: JSX.Element;
}

const Form = ({ initialValues, onSubmit, errors }: Props) => {
  const { values, handleChange, handleSubmit } = useForm({
    initialValues,
    onSubmit
  });

  return (
    <form onSubmit={handleSubmit}>
      {Object.entries(values).map(([key, value]: [string, string]) => (
        <div key={key} className="mb-3">
          <label htmlFor={key} className="form-label text-capitalize">
            {key}
          </label>
          <input
            name={key}
            value={value || ''}
            onChange={handleChange}
            placeholder={key}
            type={key === 'password' ? 'password' : 'text'}
            className="form-control text-lowercase"
          />
        </div>
      ))}
      {errors}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
