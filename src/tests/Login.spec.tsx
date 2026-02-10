import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Login from "@/pages/Login";
import userEvent from "@testing-library/user-event";

describe("Login", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });

  it("Renderiza o titulo", () => {
    expect(screen.getByText("Bem-vindo")).toBeInTheDocument();
  });

  it("Botão Entrar existe", () => {
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });  

  it("Mostra carregando ao submeter", async () => {
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/usuário/i), "teste");
    await user.type(screen.getByLabelText(/senha/i), "12345678");
    const button = screen.getByRole("button", {
      name: /entrar/i,
    });

    await user.click(button);

    expect(button).toHaveTextContent(/carregando.../i);
  });

});