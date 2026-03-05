import {
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  consultarPaciente,
  criarPaciente,
  editarPaciente,
} from "@/service/api";
import { AxiosError } from "axios";
import { Field, FieldContent, FieldError, FieldLabel } from "../ui/field";
import { Loader2, LucideToggleLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ufs } from "@/utils/utils";
import { formatarTelefone, formatarCPF } from "@/utils/format";
import { useEffect } from "react";
import { toast } from "sonner";

type ModalPacienteProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  acao: "criar" | "editar";
  id?: number;
  reload: () => Promise<void>;
};

const formSchema = z.object({
  cpf: z.string().min(1, "CPF é obrigatório"),
  nome: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(45, "O nome deve ter no máximo 45 caracteres")
    .toUpperCase(),
  telefone: z
    .string()
    .min(10, "O telefone deve ter no mínimo 10 caracteres")
    .max(11, "O telefone deve ter no máximo 11 caracteres"),
  uf: z.string().min(2, "Obrigatório").max(2),
  municipio: z
    .string()
    .min(3, "O município deve ter no mínimo 3 caracteres")
    .max(95, "O município deve ter no máximo 95 caracteres")
    .toUpperCase(),
  bairro: z
    .string()
    .min(3, "O bairro deve ter no mínimo 3 caracteres")
    .max(80, "O bairro deve ter no máximo 80 caracteres")
    .toUpperCase(),
  rua: z
    .string()
    .min(3, "A rua deve ter no mínimo 3 caracteres")
    .max(80, "A rua deve ter no máximo 80 caracteres")
    .toUpperCase(),
  numero: z
    .string()
    .min(1, "Obrigatório")
    .max(10, "O número deve ter no máximo 80 caracteres")
    .toUpperCase(),
});

export type FormFieldsPaciente = z.infer<typeof formSchema>;

const defaultValoresFormulario: FormFieldsPaciente = {
  cpf: "",
  nome: "",
  telefone: "",
  uf: "",
  municipio: "",
  bairro: "",
  rua: "",
  numero: "",
};

export default function ModalPaciente({
  isOpen,
  setIsOpen,
  acao,
  id,
  reload,
}: ModalPacienteProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValoresFormulario,
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      let response: object;
      if (acao === "criar") {
        response = await criarPaciente(data);
      } else if (acao === "editar") {
        response = await editarPaciente(id, data);
      }

      await reload();
      setIsOpen(false);
      toast.success(response.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message ?? "Erro ao salvar paciente");
      }
    }
  }

  useEffect(() => {
    if (!isOpen || acao === "criar") {
      form.reset(defaultValoresFormulario);
    }
  }, [isOpen, acao]);

  useEffect(() => {
    if (!isOpen || acao === "criar" || !id) return;

    (async () => {
      try {
        const res = await consultarPaciente(id);

        form.reset({
          ...res,
          cpf: res.cpf,
          nome: res.nome,
          telefone: res.telefone,
          uf: res.uf,
          bairro: res.bairro,
          municipio: res.municipio,
          rua: res.rua,
          numero: res.numero,
        });
      } catch (error) {
        toast.error("Erro ao carregar paciente");
      }
    })();
  }, [isOpen, id, acao]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {acao === "criar" ? "Novo Paciente" : "Editar Paciente"}
              </DialogTitle>
              <DialogDescription>
                Insira informações do paciente
              </DialogDescription>
            </DialogHeader>

            <Controller
              name="cpf"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    CPF <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    value={formatarCPF(field.value)}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "");
                      field.onChange(digits);
                    }}
                    maxLength={14}
                    placeholder="000.000.000-00"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="nome"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Nome <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    className="uppercase"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="telefone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Telefone <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    value={formatarTelefone(field.value)}
                    onChange={(e) => {
                      const onlyDigits = e.target.value.replace(/\D/g, "");
                      field.onChange(onlyDigits);
                    }}
                    maxLength={15}
                    placeholder="(00) 00000-0000"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <section className="grid grid-cols-4 gap-x-2">
              <div className="col-span-1">
                <Controller
                  name="uf"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      orientation="responsive"
                      data-invalid={fieldState.invalid}
                    >
                      <FieldContent>
                        <FieldLabel htmlFor="form-rhf-select-language">
                          UF
                        </FieldLabel>
                      </FieldContent>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-language"
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent position="item-aligned">
                          {ufs.map((uf) => (
                            <SelectItem key={uf} value={uf}>
                              {uf}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <div className="col-span-3">
                <Controller
                  name="municipio"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Município <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        className="uppercase"
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </section>

            <Controller
              name="bairro"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Bairro <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    className="uppercase"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <section className="grid grid-cols-5 gap-x-2">
              <div className="col-span-4">
                <Controller
                  name="rua"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Rua <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        className="uppercase"
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <Controller
                name="numero"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Número <span className="text-destructive">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      className="uppercase"
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </section>

            <DialogFooter className="pt-5">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
