type LogoProps = {
  height: number;
  sx?: { fill: string };
};

const GraaspLogo = ({ height, sx }: LogoProps): JSX.Element => {
  return (
    <>
      <img
        alt='LNCO Logo'
        height={height}
        style={{ ...sx }}
        src='/lnco-logo.png'
      />
    </>
  );
};

export default GraaspLogo;
