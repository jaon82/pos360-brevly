import logo from "@/assets/logo.svg";
import Form from "@/components/form";

export default function Home() {
  return (
    <div className="border max-w-screen-xl mx-auto flex flex-col">
      <div className="flex justify-center items-center mt-8 mb-3">
        <img src={logo} className="h-8" />
      </div>
      <Form />
    </div>
  );
}
