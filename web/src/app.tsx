import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home";
import LinkRedirection from "./pages/linkRedirection";
import NotFound from "./pages/not-found";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:url-alias" element={<LinkRedirection />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
