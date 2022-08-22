import "./App.css";
import Home from "./pages/home/home";
import Layout from "./components/layout";
import SpaceProvider from "./setup/spaceContext";

export interface RoomRequest {
  roomId?: string;
  displayName?: string;
  roomToken: number;
}
function App() {
  return (
    <SpaceProvider>
      <Layout>
        <Home />
      </Layout>
    </SpaceProvider>
  );
}

export default App;
