import { redirect } from 'next/navigation';

import { v4 as uuidV4 } from 'uuid';

export default function Home() {
  redirect(`/document/${uuidV4()}`);
  return <div>Home page</div>;
}
