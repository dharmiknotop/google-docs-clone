import TextEditor from '@/components/textEditor/TextEditor';

const Document = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <TextEditor documentId={id} />
    </div>
  );
};

export default Document;
