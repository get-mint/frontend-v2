import { LoginForm } from "./form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl animate-in fade-in slide-in-from-top-2 duration-500">
        <LoginForm />
      </div>
    </div>
  )
}
