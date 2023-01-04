import ChatBox from "../components/misc/chatbox";
import MyChats from "../components/misc/mychats";
import SideDrawer from "../components/misc/sidedrawer";
import { ChatState } from "../context/chatprovider";

const Chats = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <div className="card StanderdizedBox" style={{ width: "90%" }}>
        <h5 className="card-header">Main Card</h5>
        <div
          className="card-body StanderdizedBox"
          style={{
            width: "100%",
            height: "91.5vh",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {user && <MyChats />}
          {user && <ChatBox />}
        </div>
      </div>
    </div>
  );
};

export default Chats;
