import { useSearchParams} from "react-router";
import RoomContent from "./content/RoomContent.jsx";

function Room() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const token = localStorage.getItem("token");

    return (
            <RoomContent />
    );
}

export default Room;
