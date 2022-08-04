import "./App.css";
import { SocketContextProvider } from "./setup/socketContext";
import ThemeProvider from "./setup/themeContext";
import Home from "./pages/home";
import Layout from "./components/layout";
import { ConfigurationContextProvider } from "./setup/configurationContext";
import SpaceProvider from "./setup/spaceContext";

export interface RoomRequest {
  roomId?: string;
  displayName?: string;
  roomToken: number;
}

function App() {
  return (
    <SpaceProvider>
      <ConfigurationContextProvider>
        <ThemeProvider>
          <SocketContextProvider>
            <Layout>
              <div>
                <Home />
              </div>
            </Layout>
          </SocketContextProvider>
        </ThemeProvider>
      </ConfigurationContextProvider>
    </SpaceProvider>
  );
}

export default App;
