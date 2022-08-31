import { useContext } from "react";
import SpaceView from "../space";
import Spaces from "../../components/spaces";
import "./index.scss";
import "../index.scss";
import { Manager } from "socket.io-client";
import { SpaceContext } from "../../context/spaceContext";
import { API_BASE_URL } from "../../services/apiHandler";
export const manager = new Manager(API_BASE_URL);

export default function Home() {
  const currentspace = useContext(SpaceContext);

  return (
    <div className={"main-page"}>
      {currentspace.spaceInfo ? (
        <SpaceView spaceInfromation={currentspace.spaceInfo} />
      ) : (
        <Spaces />
      )}
    </div>
  );
}

// export function HomePage() {
//   return (
//     <div className="homepage">
//       <div className="homepage">
//         <a href={"https://www.craft.do/s/o6G7z0fKIr59dL"}>HomePage</a>
//       </div>
//       <div className="homepage">
//         <a
//           href={
//             "https://www.craft.do/s/o6G7z0fKIr59dL/b/AC6856A4-B2CB-4D68-8495-AD22A6F75419/The_Great_Flood"
//           }
//         >
//           Hector de Seal
//         </a>
//       </div>
//     </div>
//   );
// }
