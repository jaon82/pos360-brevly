import logo from "@/assets/logo.svg";
import Form from "@/components/form";
import MyLinks from "@/components/myLinks";

export default function Home() {
  return (
    <div className="max-w-screen-xl mx-auto mb-10 flex flex-col gap-3 px-3">
      <div className="flex justify-center items-center mt-8 mb-3 sm:justify-start">
        <img src={logo} className="h-8" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Form />
        <MyLinks />
      </div>
    </div>
  );
}
