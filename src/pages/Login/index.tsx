import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, HeartPulse } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import clinica from "@/assets/images/clinica.svg";
import { useNavigate } from "react-router";

export default function Login() {
  const [isMostrarSenha, setIsMostrarSenha] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate("/agenda");
  }

  return (
    <>
      <main className="grid md:grid-cols-2 container mx-auto h-screen">
        <section className="hidden md:flex flex-col justify-center items-center">
          <img src={clinica} alt="clinica" />
        </section>
        <section className="flex flex-col justify-center items-center">
          <HeartPulse className="w-14 h-14 bg-primary text-primary-foreground p-3 rounded-full" />
          <div className="mt-3">
            <h1 className="text-zinc-800 text-center tracking-tight text-3xl font-bold leading-tight">
              Bem-vindo
            </h1>
            <h2 className="text-zinc-600 text-base font-normal leading-normal pt-1">
              Insira suas credenciais para continuar.
            </h2>
          </div>
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 w-full max-w-lg p-4"
          >
            <section className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label htmlFor="usuario">Usuário</Label>
                <Input id="usuario" type="text" />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="senha">Senha</Label>
                <div className="flex gap-2 relative">
                  <Input
                    id="senha"
                    type={isMostrarSenha ? "text" : "password"}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => setIsMostrarSenha(!isMostrarSenha)}
                    className="absolute end-0 text-zinc-400"
                  >
                    {isMostrarSenha ? <Eye /> : <EyeClosed />}
                  </Button>
                </div>
              </div>
            </section>
            <section>
              <Button size="lg" className="w-full" type="submit">
                Entrar
              </Button>
            </section>
            <section className="flex items-center gap-4">
              <hr className="w-full border-zinc-300" />
              <span className="text-sm text-zinc-400">OU</span>
              <hr className="w-full border-zinc-300" />
            </section>
            <section>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => console.error("Login failed")}
              />
            </section>
          </form>
        </section>
      </main>
    </>
  );
}
