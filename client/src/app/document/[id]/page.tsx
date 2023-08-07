import TextEditor from '@/components/textEditor/TextEditor';

const Document = ({ params }) => {
  const { id } = params;

  return <TextEditor documentId={id} />;
};

export default Document;
