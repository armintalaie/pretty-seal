import Home from "./pages/home/home";
import Layout from "./components/layout";
import SpaceProvider from "./context/spaceContext";
import ThemeProvider from "./context/themeContext";

export interface RoomRequest {
  roomId?: string;
  displayName?: string;
  roomToken: number;
}
function App() {
  return (
    <ThemeProvider>
      <SpaceProvider>
        <Layout>
          <Home />
        </Layout>
      </SpaceProvider>
    </ThemeProvider>
  );
}

export default App;
