import Sidebar from "../components/sidebar/Sidebar";

const AppLayout = ({ children }) => {
  return (
    <>
      <div className={`h-full flex flex-col md:flex-row`}>
        <div className="w-full md:w-[224px]">
          <Sidebar />
        </div>
        <div className="bg-primaryBG w-full h-screen overflow-y-auto">
          <main className="w-full">{children}</main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
