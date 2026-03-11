"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AuthPageShell from "@/components/auth/AuthPageShell";
import {
  requestPasswordRecovery,
  resetPassword,
  verifyPasswordRecoveryOtp,
} from "@/lib/accounts-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";

type Step = "request" | "verify" | "reset";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("request");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRequestOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await requestPasswordRecovery(identifier);
      toast.success(result.message);
      setStep("verify");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha ao pedir OTP");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await verifyPasswordRecoveryOtp({ identifier, otp });
      setResetToken(result.reset_token);
      toast.success(result.message);
      setStep("reset");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "OTP inv\u00e1lido");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("As senhas n\u00e3o coincidem");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await resetPassword({
        reset_token: resetToken,
        new_password: newPassword,
      });
      toast.success(result.message);
      router.push("/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Falha ao redefinir a senha");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthPageShell
      title="Recuperar senha"
      description="Receba um c\u00f3digo OTP no WhatsApp associado \u00e0 sua conta e defina uma nova senha."
    >
      <div className="space-y-6">
        <div className="flex gap-2 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
          <span className={step === "request" ? "text-primary" : ""}>1. Pedir OTP</span>
          <span>/</span>
          <span className={step === "verify" ? "text-primary" : ""}>2. Validar</span>
          <span>/</span>
          <span className={step === "reset" ? "text-primary" : ""}>3. Nova senha</span>
        </div>

        {step === "request" ? (
          <form onSubmit={handleRequestOtp} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="identifier">Email, username ou telefone</Label>
              <Input
                id="identifier"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                placeholder="email, username ou 25884..."
                required
              />
              <p className="text-sm text-muted-foreground">
                O OTP ser\u00e1 enviado para o WhatsApp verificado do utilizador.
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "A enviar..." : "Enviar OTP por WhatsApp"}
            </Button>
          </form>
        ) : null}

        {step === "verify" ? (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="space-y-3">
              <Label htmlFor="otp">C\u00f3digo OTP</Label>
              <InputOTP
                id="otp"
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                containerClassName="justify-center"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className="text-sm text-muted-foreground">
                Introduza o c\u00f3digo recebido no WhatsApp do utilizador.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setOtp("");
                  setStep("request");
                }}
              >
                Voltar
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting || otp.length < 4}>
                {isSubmitting ? "A validar..." : "Validar OTP"}
              </Button>
            </div>
          </form>
        ) : null}

        {step === "reset" ? (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova senha</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="M\u00ednimo de 8 caracteres"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setStep("verify")}
              >
                Voltar
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "A guardar..." : "Redefinir senha"}
              </Button>
            </div>
          </form>
        ) : null}

        <p className="text-sm text-muted-foreground">
          Lembrou-se da senha?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Voltar para login
          </Link>
        </p>
      </div>
    </AuthPageShell>
  );
}
