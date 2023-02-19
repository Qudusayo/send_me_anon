import { Route, Routes } from "react-router-dom";

import Auth from "./Pages/Auth/Auth";
import Anon from "./Pages/Anon/Index";
import Result from "./Pages/Result/Index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Anon />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="messages" element={<Result />} />
    </Routes>
  );
}

export default App;
