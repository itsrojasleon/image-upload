interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type?: string;
  'aria-label': string;
}

const Input: React.FC<InputProps> = ({ label, type = 'text', ...props }) => {
  return (
    <div className="mb-3">
      <label htmlFor="email" className="form-label text-capitalize">
        {label}
      </label>
      <input
        autoCapitalize="off"
        autoComplete="off"
        type={type}
        className="form-control text-lowercase"
        {...props}
      />
    </div>
  );
};

export default Input;
