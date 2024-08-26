
import { useSelector } from "react-redux";
import DiyTourScreen from "./DiyTourScreen"
import AnnounceScreen from "./AnnounceScreen";

export default function AddScreen() {
  const user = useSelector((state) => state.user.value);
  console.log("REDUCER ==>", user);
  const userIsArtist = useSelector((state) => state.user.value.isArtist);
  const userIsHost = useSelector((state) => state.user.value.isHost);

  return (
    <>
      {userIsArtist && <DiyTourScreen />}
      {userIsHost && <AnnounceScreen />}
    </>
  );
}


