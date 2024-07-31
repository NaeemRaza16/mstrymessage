import Navbar from '@/components/Navbar';

interface RootLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: any) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;