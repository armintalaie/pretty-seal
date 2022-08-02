import "./App.css";
import { SocketContextProvider } from "./setup/socketContext";
import ThemeProvider from "./setup/themeContext";
import Home from "./pages/home";
import Layout from "./components/layout";
import { ConfigurationContextProvider } from "./setup/configurationContext";

export interface RoomRequest {
  roomId?: string;
  displayName?: string;
  roomToken: number;
}

function App() {
  return (
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
  );
}

export default App;
