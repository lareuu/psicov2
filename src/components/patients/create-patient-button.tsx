"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { usePatients } from "@/hooks/use-patients"
import { z } from "zod"

const formSchema = z.object({
  first_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  last_name: z.string().min(2, "Los apellidos deben tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
  dni: z.string().length(9, "DNI inválido"),
  street_address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  postal_code: z.string().length(5, "Código postal inválido"),
  city: z.string().min(2, "La ciudad debe tener al menos 2 caracteres"),
  country: z.string().min(2, "El país debe tener al menos 2 caracteres"),
  lopd_signed: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

export function CreatePatientButton() {
  const [open, setOpen] = useState(false)
  const { createPatient, isAuthenticated } = usePatients()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      dni: "",
      street_address: "",
      postal_code: "",
      city: "",
      country: "",
      lopd_signed: false,
    },
  })

  const onSubmit = async (data: FormValues) => {
    console.log("Enviando datos del paciente: ", data)

    if (!isAuthenticated) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para crear pacientes",
        variant: "destructive",
      })
      return
    }

    try {
      const { success, error } = await createPatient(data)
      console.log("Respuesta de createPatient: ", { success, error })

      if (success) {
        toast({
          title: "Paciente creado",
          description: "El paciente ha sido añadido exitosamente.",
        })
        setOpen(false)
        form.reset()
      } else {
        toast({
          title: "Error",
          description: error || "No se pudo crear el paciente.",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("Error al crear paciente: ", err)
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error al añadir el paciente.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Añadir paciente</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Añadir paciente</DialogTitle>
          <DialogDescription>Introduce los datos del paciente. Todos los datos son obligatorios.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {[
              { name: "first_name", label: "Nombre", placeholder: "Ej. Juan" },
              { name: "last_name", label: "Apellidos", placeholder: "Ej. Pérez García" },
              { name: "email", label: "Correo electrónico", placeholder: "Ej. juan@email.com", type: "email" },
              { name: "phone", label: "Teléfono", placeholder: "Ej. 600123456", type: "tel" },
              { name: "dni", label: "DNI", placeholder: "Ej. 12345678X" },
              { name: "street_address", label: "Dirección", placeholder: "Ej. Calle Mayor 10" },
              { name: "postal_code", label: "Código Postal", placeholder: "Ej. 28001" },
              { name: "city", label: "Ciudad", placeholder: "Ej. Madrid" },
              { name: "country", label: "País", placeholder: "Ej. España" },
            ].map(({ name, label, placeholder, type }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as keyof FormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input type={type || "text"} placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors[name]?.message} {/* Mostramos el mensaje de error */}
                    </FormMessage>
                  </FormItem>
                )}
              />
            ))}

            <FormField
              control={form.control}
              name="lopd_signed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel>Acepta la LOPD</FormLabel>
                  <FormMessage>
                    {form.formState.errors.lopd_signed?.message} {/* Mensaje de error si no se marca */}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!form.formState.isValid}>
              Crear paciente
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

