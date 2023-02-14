import BottomBar from "./BottomBar";
import ExistChats from "./ExistChats";
import Search from "./Search";

const SideBar = () => {
    return (
        <div id="sidebar-base" className="bg-gray-700 w-1/3 h-full rounded-l-lg flex flex-col max-md:hidden">
            <Search />
            <ExistChats />
            <BottomBar />
        </div>
    );
};

export default SideBar;