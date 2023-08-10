export interface FileImageProps {
  alt: string;
  url?: string;
  id?: string;
}

const FileImage = ({ id, url, alt }: FileImageProps): JSX.Element => {
  return (
    <img id={id} src={url} alt={alt} title={alt} style={{ maxWidth: '100%' }} />
  );
};

export default FileImage;
