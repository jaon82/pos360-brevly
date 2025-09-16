import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

export default function Form() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Novo link</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4 sm:min-w-[19.75rem]">
          <Input
            id="originalLink"
            label="link original"
            placeholder="www.exemplo.com.br"
          />
          <Input id="alias" label="link encurtado" prefix="brev.ly/" />
          <Button disabled>Salvar link</Button>
        </form>
      </CardContent>
    </Card>
  );
}
