import ForbiddenText from './ForbiddenText.js';

export type ForbiddenContentProps = {
  /**
   * Id to put on the root component
   */
  id?: string;
  /**
   * Id of the current member used to display the authenticated alternative
   */
  memberId?: string;
  /**
   * Title to display
   */
  title?: string;
  /**
   * Text to display if the member is authenticated (logged-in)
   */
  authenticatedText?: string;
};

const ForbiddenContent = ({
  id,
  memberId,
  title,
  authenticatedText,
}: ForbiddenContentProps): JSX.Element => (
  <ForbiddenText
    id={id}
    title={title}
    helperText={memberId ? authenticatedText : undefined}
  />
);

export default ForbiddenContent;
