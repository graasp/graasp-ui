import Typography, { TypographyProps } from '@mui/material/Typography';

interface QuestionLabelProps {
  typographyProps?: TypographyProps;
  children: JSX.Element | JSX.Element[];
  width?: number;
  dataCy?: string;
}

const QuestionLabel = ({
  typographyProps,
  children,
  width,
  dataCy,
}: QuestionLabelProps): JSX.Element => (
  <Typography
    {...typographyProps}
    sx={{ ...typographyProps?.sx, mb: 1, width }}
    variant='h6'
    data-cy={dataCy}
  >
    {children}
  </Typography>
);

export default QuestionLabel;
