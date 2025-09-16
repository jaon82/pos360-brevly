import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home";
import LinkRedirection from "./pages/linkRedirection";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:url-alias" element={<LinkRedirection />} />
      </Routes>
    </BrowserRouter>
  );
}
