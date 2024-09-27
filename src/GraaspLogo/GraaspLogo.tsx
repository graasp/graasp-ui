type Props = {
  height: number;
};

const GraaspLogo = ({ height }: Props): JSX.Element => {
  return (
    <>
      <img alt='LNCO Logo' height={height} src='/lnco-logo.png' />
    </>
  );
};

export default GraaspLogo;
