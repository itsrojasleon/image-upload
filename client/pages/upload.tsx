import Title from '../components/title';
import Input from '../components/input';
import { useInputFile } from '../hooks/use-input-file';

const Upload = () => {
  const file = useInputFile();

  return (
    <div>
      <Title>Upload</Title>
      <h5>Select an image</h5>
      <Input
        type="file"
        {...file}
        placeholder=""
        label="file"
        name="file"
        aria-label="file-input"
        accept="image/*"
      />
      {/* description */}
      {/* title */}
      {/* image */}
    </div>
  );
};

export default Upload;
