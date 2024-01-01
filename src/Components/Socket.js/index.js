
import { io } from "socket.io-client";

const URL = "http://localhost:3000";
const socket = io(URL, { autoConnect: false });
// export const SocketContext = React.createContext();

export default socket