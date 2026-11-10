"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LogOut, RefreshCw, Search, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import {
  adminStorage,
  getAdminMe,
  getAdminOverview,
  listAdminUsers,
  loginAdmin,
  type AdminMe,
  type AdminOverview,
  type AdminUserListItem,
} from "@/lib/accounts-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AccessState = "checking" | "login" | "ready";

function formatDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("pt-MZ", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function ManagerLogin({
  onSuccess,
}: {
  onSuccess: (token: string, admin: AdminMe) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    try {
      const tokens = await loginAdmin({ username, password });
      localStorage.setItem(adminStorage.accessTokenKey, tokens.access_token);
      const admin = await getAdminMe(tokens.access_token);
      onSuccess(tokens.access_token, admin);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login de admin falhou");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-hero-gradient">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Link href="/" className="font-display text-base font-bold text-primary sm:text-lg">
          BlueSpark MZ
        </Link>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <ShieldCheck className="size-3.5" />
          Manager
        </span>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-76px)] w-full max-w-md items-center px-4 pb-12">
        <section className="w-full rounded-2xl border border-border/70 bg-card p-6 shadow-[0_20px_60px_-30px_rgba(27,19,64,0.25)] sm:p-8">
          <div className="mb-6 space-y-2 text-center">
            <h1 className="font-display text-2xl font-bold tracking-tight text-[#0B0A12]">
              Manager
            </h1>
            <p className="text-sm text-muted-foreground">
              Acesso exclusivo a administradores BlueSpark.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="admin@bluesparkmz.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <Button className="w-full" type="submit" disabled={submitting}>
              {submitting ? "A entrar…" : "Entrar"}
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default function ManagerPage() {
  const [access, setAccess] = useState<AccessState>("checking");
  const [token, setToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<AdminMe | null>(null);
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [users, setUsers] = useState<AdminUserListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [productCode, setProductCode] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "inactive">("all");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const limit = 50;

  const logout = useCallback(() => {
    localStorage.removeItem(adminStorage.accessTokenKey);
    setToken(null);
    setAdmin(null);
    setOverview(null);
    setUsers([]);
    setAccess("login");
  }, []);

  const loadData = useCallback(
    async (adminToken: string, nextOffset = offset) => {
      setLoading(true);
      setError(null);
      try {
        const isActive =
          activeFilter === "all" ? null : activeFilter === "active";
        const [nextOverview, page] = await Promise.all([
          getAdminOverview(adminToken),
          listAdminUsers(adminToken, {
            q,
            product_code: productCode || undefined,
            is_active: isActive,
            limit,
            offset: nextOffset,
          }),
        ]);
        setOverview(nextOverview);
        setUsers(page.items);
        setTotal(page.total);
        setOffset(page.offset);
      } catch (cause) {
        const message = cause instanceof Error ? cause.message : "Falha ao carregar";
        if (/401|403|admin|permiss/i.test(message) || message.toLowerCase().includes("token")) {
          logout();
          return;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [activeFilter, logout, offset, productCode, q],
  );

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      const stored = localStorage.getItem(adminStorage.accessTokenKey);
      if (!stored) {
        if (!cancelled) setAccess("login");
        return;
      }

      try {
        const me = await getAdminMe(stored);
        if (cancelled) return;
        setToken(stored);
        setAdmin(me);
        setAccess("ready");
        await loadData(stored, 0);
      } catch {
        localStorage.removeItem(adminStorage.accessTokenKey);
        if (!cancelled) setAccess("login");
      }
    }

    void bootstrap();
    return () => {
      cancelled = true;
    };
    // bootstrap once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productOptions = useMemo(
    () => overview?.by_product ?? [],
    [overview],
  );

  const pageStart = total === 0 ? 0 : offset + 1;
  const pageEnd = Math.min(offset + users.length, total);
  const canPrev = offset > 0;
  const canNext = offset + limit < total;

  if (access === "checking") {
    return (
      <div className="grid min-h-screen place-items-center bg-hero-gradient">
        <span
          aria-label="A carregar"
          className="size-7 animate-spin rounded-full border-2 border-muted border-t-primary"
        />
      </div>
    );
  }

  if (access === "login" || !token || !admin) {
    return (
      <ManagerLogin
        onSuccess={(nextToken, nextAdmin) => {
          setToken(nextToken);
          setAdmin(nextAdmin);
          setAccess("ready");
          void loadData(nextToken, 0);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6FB]">
      <header className="border-b border-border/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-4 sm:px-6">
          <Link href="/" className="font-display text-lg font-bold text-primary">
            BlueSpark MZ
          </Link>
          <span className="hidden text-sm text-muted-foreground sm:inline">/ Manager</span>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-foreground">
                {admin.full_name || admin.email}
              </p>
              <p className="text-xs text-muted-foreground">{admin.role}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={loading}
              onClick={() => void loadData(token, offset)}
            >
              <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
            <Button variant="ghost" size="icon" aria-label="Sair" onClick={logout}>
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#0B0A12]">
            Utilizadores BlueSpark
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Contas da identidade BlueSpark e as apps activas de cada utilizador.
          </p>
        </div>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-border/70 bg-white px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Total
            </p>
            <p className="mt-2 font-display text-3xl font-bold">{overview?.total_users ?? "—"}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-white px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Activos
            </p>
            <p className="mt-2 font-display text-3xl font-bold">{overview?.active_users ?? "—"}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-white px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Inactivos
            </p>
            <p className="mt-2 font-display text-3xl font-bold">{overview?.inactive_users ?? "—"}</p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-white px-5 py-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Apps
            </p>
            <p className="mt-2 font-display text-3xl font-bold">{overview?.products_count ?? "—"}</p>
          </div>
        </section>

        {overview && overview.by_product.length > 0 ? (
          <section className="mt-4 flex flex-wrap gap-2">
            {overview.by_product.map((product) => (
              <button
                key={product.product_code}
                type="button"
                onClick={() => {
                  setProductCode(
                    productCode === product.product_code ? "" : product.product_code,
                  );
                  setOffset(0);
                  if (token) {
                    void loadData(token, 0);
                  }
                }}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  productCode === product.product_code
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {product.product_name}
                <span className="ml-1.5 opacity-70">{product.users_count}</span>
              </button>
            ))}
          </section>
        ) : null}

        <section className="mt-8 rounded-2xl border border-border/70 bg-white">
          <div className="flex flex-col gap-3 border-b border-border/70 p-4 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                value={q}
                onChange={(event) => setQ(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && token) {
                    setOffset(0);
                    void loadData(token, 0);
                  }
                }}
                placeholder="Pesquisar email, username, nome ou telefone"
              />
            </div>
            <select
              aria-label="Estado"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              value={activeFilter}
              onChange={(event) => {
                setActiveFilter(event.target.value as "all" | "active" | "inactive");
                setOffset(0);
              }}
            >
              <option value="all">Todos</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
            <Button
              variant="outline"
              onClick={() => {
                setOffset(0);
                if (token) void loadData(token, 0);
              }}
            >
              Filtrar
            </Button>
          </div>

          {error ? (
            <p className="border-b border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-border/70 bg-[#F7F6FB] text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Utilizador</th>
                  <th className="px-4 py-3 font-medium">Apps</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Desde</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">
                      {loading ? "A carregar…" : "Nenhum utilizador encontrado."}
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b border-border/50 last:border-0">
                      <td className="px-4 py-4 align-top">
                        <p className="font-semibold text-foreground">
                          {user.full_name || user.username}
                        </p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                      </td>
                      <td className="px-4 py-4 align-top">
                        {user.apps.length === 0 ? (
                          <span className="text-muted-foreground">—</span>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            {user.apps.map((app) => (
                              <span
                                key={`${user.id}-${app}`}
                                className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                              >
                                {app}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 align-top">
                        <span
                          className={
                            user.is_active
                              ? "text-emerald-700"
                              : "text-muted-foreground"
                          }
                        >
                          {user.is_active ? "Activo" : "Inactivo"}
                        </span>
                        {!user.is_verified ? (
                          <p className="mt-1 text-xs text-amber-700">Não verificado</p>
                        ) : null}
                      </td>
                      <td className="px-4 py-4 align-top text-muted-foreground">
                        {formatDate(user.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-border/70 px-4 py-3 text-sm text-muted-foreground">
            <p>
              {pageStart}–{pageEnd} de {total}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!canPrev || loading}
                onClick={() => {
                  const next = Math.max(0, offset - limit);
                  setOffset(next);
                  void loadData(token, next);
                }}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!canNext || loading}
                onClick={() => {
                  const next = offset + limit;
                  setOffset(next);
                  void loadData(token, next);
                }}
              >
                Seguinte
              </Button>
            </div>
          </div>
        </section>

        {/* productOptions kept for filter chips above; silence unused if empty */}
        <span className="sr-only">{productOptions.length}</span>
      </main>
    </div>
  );
}
