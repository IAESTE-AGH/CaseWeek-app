import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel } from "@mui/material"
import { Button } from "../button"
import { Input } from "../input"
import { Link } from "../link"
import { useMutation } from "react-query"
import { $axios } from "@/services"
import { useCurrentUserReducer } from "@/contexts/Auth/hooks/useCurrentUserReducer"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"

interface I_LoginData {
    email: string
    password: string
}

export function LoginForm() {
    const currentUser = useCurrentUserReducer()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues: { email: "", password: "" } })

    const {
        mutateAsync: makeLoginRequest,
        isLoading,
        isSuccess,
    } = useMutation({
        mutationKey: "login",
        mutationFn: async ({ email, password }: I_LoginData) => {
            return await $axios.post("/auth/login", {
                email: email,
                password: password,
            })
        },
        onSuccess: ({ data }) => {
            currentUser.actions.setAuthenticated(data)
            console.log("🟩 AuthProvider: Logged in successfully")
            toast.success("Zalogowano pomyślnie")
            // navigate("/")
        },
        onError: (error) => {
            console.log("🟥 AuthProvider: Error while logging in: ", error)
            toast.error("Błędne dane logowania, spróbuj ponownie")
        },
    })

    const onSubmit = async (data: I_LoginData) => {
        console.log("login attempt", data)
        await makeLoginRequest(data)
    }

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl required fullWidth margin="normal">
                    <FormLabel sx={{ "&.Mui-focused": { color: "#8f7148" } }}>Email</FormLabel>
                    <Input
                        {...register("email", {
                            required: { value: true, message: "Adres email jest wymagany" },
                            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Podaj poprawny adres email" },
                        })}
                        type="email"
                        placeholder="john.appleseed@example.com"
                    />
                    {errors.email && <FormHelperText error>{String(errors.email.message)}</FormHelperText>}
                </FormControl>
                <FormControl required fullWidth margin="normal">
                    <FormLabel sx={{ "&.Mui-focused": { color: "#8f7148" } }}>Hasło</FormLabel>
                    <Input {...register("password", { required: { value: true, message: "Hasło jest wymagane do zalogowania się" } })} type="password" placeholder="Wprowadź swoje hasło" />
                    {errors.password && <FormHelperText error>{String(errors.password.message)}</FormHelperText>}
                </FormControl>

                <Box display="flex" justifyContent={"end"} alignItems={"center"}>
                    {/* TODO: add remember me functionality */}
                    {/* <FormControlLabel control={<Checkbox />} label="Zapamiętaj mnie" /> */}
                    {/* TODO: add path to password recovery page */}
                    <Link to="">Nie pamiętam hasła</Link>
                </Box>
                <Box mt="1rem" />
                <Box display={"flex"} flexDirection={"column"} mt={4}>
                    <Button type="submit" title="Zaloguj się" disabled={isLoading || isSuccess} />
                </Box>
            </form>
        </Box>
    )
}
