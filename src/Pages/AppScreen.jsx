import Chat from "../Components/Chat"
import SideBar from "../Components/SideBar"

const AppScreen = () => {
    return (
        <div id="app-base" className="w-screen h-screen bg-indigo-500 flex items-center justify-center">
            <div id="app-wrapper" className="bg-white w-4/5 h-4/5 rounded-lg flex max-md:w-5/6">
                <SideBar />
                <Chat />
            </div>
        </div>
    );
};

export default AppScreen;