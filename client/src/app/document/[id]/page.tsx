import TextEditor from '@/components/textEditor/TextEditor';

const Document = (props: any) => {
  const { id } = props.params;

  return (
    <div>
      <TextEditor documentId={id} />
    </div>
  );
};

export default Document;
