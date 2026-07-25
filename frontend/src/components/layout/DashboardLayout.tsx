import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-surface font-body-md text-on-surface min-h-screen">
      <Sidebar />
      <div className="pl-72 flex flex-col w-full min-h-screen">
        <Header />
        <main className="flex-1 p-xl">{children}</main>
      </div>
    </div>
  );
}
