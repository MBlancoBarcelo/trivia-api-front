import { useSearchParams} from "react-router";
import { SSEProvider } from "./context/SSEContext.jsx";
import RoomContent from "./content/RoomContent.jsx";

function Room() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const token = localStorage.getItem("token");

    return (
        <SSEProvider id={id} token={token}>
            <RoomContent />
        </SSEProvider>
    );
}

export default Room;
