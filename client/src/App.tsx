import "./App.css";
import { SocketContextProvider } from "./setup/socketContext";
import ThemeProvider from "./setup/themeContext";
import Home from "./home";
import Layout from "./components/layout";

export interface RoomRequest {
  roomId?: string;
  displayName?: string;
  roomToken: number;
}

function App() {
  return (
    <ThemeProvider>
      <SocketContextProvider>
        <Layout>
          <div>
            <Home />
          </div>
        </Layout>
      </SocketContextProvider>
    </ThemeProvider>
  );
}

export default App;
