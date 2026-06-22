import { LoginForm } from "@/components/auth/login-form";
import { redirectIfAuthenticated } from "@/lib/auth/server";

export default async function LoginPage() {
  await redirectIfAuthenticated();

  return <LoginForm />;
}
