import { Sidebar } from '@/components/Sidebar';
import { NavbarWrapper } from '@/components/Navbar';
import { getSession } from '@/lib/auth';

export default async function RootDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-w-0">
        <NavbarWrapper user={session} />
        <main className="flex-1 overflow-y-auto bg-[#0a0a0a]">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
