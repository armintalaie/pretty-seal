import Home from "./pages";
import Layout from "./components/layout";
import SpaceProvider from "./context/spaceContext";
import ThemeProvider from "./context/themeContext";
import { BrowserRouter } from "react-router-dom";

export interface RoomRequest {
  roomId?: string;
  displayName?: string;
  roomToken: number;
}
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <SpaceProvider>
          <Layout>
            <Home />
          </Layout>
        </SpaceProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
