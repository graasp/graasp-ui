type FileImageProps = {
  alt: string;
  url?: string;
  id?: string;
};

const FileImage = ({ id, url, alt }: FileImageProps): JSX.Element => {
  return (
    <img
      id={id}
      src={url}
      alt={alt}
      title={alt}
      style={{
        // do not overflow the parent
        maxWidth: '100%',
        // display bigger than the original size if the parent wants it
        width: '100%',
      }}
    />
  );
};

export default FileImage;
