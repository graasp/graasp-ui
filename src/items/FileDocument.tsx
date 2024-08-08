import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import '@cyntler/react-doc-viewer/dist/index.css';

type Props = {
  uri: string;
};
const FileDocument = ({ uri }: Props): JSX.Element => {
  const docs = [{ uri }];
  return (
    <DocViewer
      documents={docs}
      pluginRenderers={DocViewerRenderers}
      prefetchMethod='GET'
    />
  );
};

export default FileDocument;
