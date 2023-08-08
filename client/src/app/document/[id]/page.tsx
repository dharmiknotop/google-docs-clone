import TextEditor from '@/components/textEditor/TextEditor';

const Document = ({ params }) => {
  const { id } = params;

  return (
    <div>
      sdf
      <TextEditor documentId={id} />
    </div>
  );
};

export default Document;
