import { Toaster } from "sonner";
import RouteProvider from "./providers/RouteProvider";

function App() {
  return (
    <>
      <RouteProvider />
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
