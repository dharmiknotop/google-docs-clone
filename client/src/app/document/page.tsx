import AddBlankDocument from '@/components/document/blankDocument/BlankDocument';
import RecentDocument from '@/components/document/recentDocument/RecentDocument';
import Navbar from '@/components/navbar/Navbar';

const page = () => {
  return (
    <div>
      <Navbar />

      <AddBlankDocument />

      <RecentDocument />
    </div>
  );
};

export default page;
