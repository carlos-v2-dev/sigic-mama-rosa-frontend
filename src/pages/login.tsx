import { LoginForm } from "@/components/loginForm"
import PrincipalLayout from "@/components/auth-layout"
import "@/auth.css"

export default function LoginPage() {
    return (
        <PrincipalLayout>
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <LoginForm />
                </div>
            </div>
        </PrincipalLayout>
    )
}