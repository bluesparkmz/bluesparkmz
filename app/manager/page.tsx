"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, RefreshCw, Search, ShieldCheck } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  getAdminOverview,
  isPlatformAdmin,
  listAdminUsers,
  type AdminOverview,
  type AdminUserListItem,
} from "@/lib/accounts-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AccessState = "checking" | "denied" | "ready";
type ActiveFilter = "all" | "active" | "inactive";

const PAGE_SIZE = 50;

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

export default function ManagerPage() {
  const router = useRouter();
  const { user, accessToken, isLoading, logout } = useAuth();
  const [access, setAccess] = useState<AccessState>("checking");
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [users, setUsers] = useState<AdminUserListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");
  const [productCode, setProductCode] = useState("");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(
    async (
      token: string,
      overrides: {
        q?: string;
        productCode?: string;
        activeFilter?: ActiveFilter;
        offset?: number;
      } = {},
    ) => {
      const nextQ = overrides.q ?? q;
      const nextProduct = overrides.productCode ?? productCode;
      const nextActive = overrides.activeFilter ?? activeFilter;
      const nextOffset = overrides.offset ?? offset;

      setLoading(true);
      setError(null);
      try {
        const isActive = nextActive === "all" ? null : nextActive === "active";
        const [nextOverview, page] = await Promise.all([
          getAdminOverview(token),
          listAdminUsers(token, {
            q: nextQ,
            product_code: nextProduct || undefined,
            is_active: isActive,
            limit: PAGE_SIZE,
            offset: nextOffset,
          }),
        ]);
        setOverview(nextOverview);
        setUsers(page.items);
        setTotal(page.total);
        setOffset(page.offset);
      } catch (cause) {
        const message = cause instanceof Error ? cause.message : "Falha ao carregar";
        const lower = message.toLowerCase();
        if (
          lower.includes("token") ||
          lower.includes("admin") ||
          lower.includes("permiss") ||
          lower.includes("unauthorized")
        ) {
          setAccess("denied");
          return;
        }
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [activeFilter, offset, productCode, q],
  );

  useEffect(() => {
    if (isLoading) return;

    if (!user || !accessToken) {
      router.replace("/login?next=/manager");
      return;
    }

    if (!isPlatformAdmin(user)) {
      setAccess("denied");
      return;
    }

    setAccess("ready");
    void loadData(accessToken, { offset: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, isLoading, router, user]);

  const pageStart = total === 0 ? 0 : offset + 1;
  const pageEnd = Math.min(offset + users.length, total);
  const canPrev = offset > 0;
  const canNext = offset + PAGE_SIZE < total;

  if (access === "checking" || isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-hero-gradient">
        <span
          aria-label="A carregar"
          className="size-7 animate-spin rounded-full border-2 border-muted border-t-primary"
        />
      </div>
    );
  }

  if (access === "denied") {
    return (
      <div className="grid min-h-screen place-items-center bg-hero-gradient px-4">
        <div className="w-full max-w-md rounded-2xl border border-border/70 bg-card p-8 text-center">
          <ShieldCheck className="mx-auto size-10 text-primary" />
          <h1 className="mt-4 font-display text-2xl font-bold">Acesso restrito</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Só administradores BlueSpark podem entrar no Manager.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/">Início</Link>
            </Button>
            <Button
              onClick={() => {
                logout();
                router.push("/login?next=/manager");
              }}
            >
              Trocar conta
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !accessToken) {
    return null;
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
                {user.full_name || user.email}
              </p>
              <p className="text-xs text-muted-foreground">admin</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={loading}
              onClick={() => void loadData(accessToken)}
            >
              <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Sair"
              onClick={() => {
                logout();
                router.push("/login?next=/manager");
              }}
            >
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
            {overview.by_product.map((product) => {
              const selected = productCode === product.product_code;
              return (
                <button
                  key={product.product_code}
                  type="button"
                  onClick={() => {
                    const next = selected ? "" : product.product_code;
                    setProductCode(next);
                    setOffset(0);
                    void loadData(accessToken, { productCode: next, offset: 0 });
                  }}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {product.product_name}
                  <span className="ml-1.5 opacity-70">{product.users_count}</span>
                </button>
              );
            })}
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
                  if (event.key === "Enter") {
                    setOffset(0);
                    void loadData(accessToken, { q, offset: 0 });
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
                const next = event.target.value as ActiveFilter;
                setActiveFilter(next);
                setOffset(0);
                void loadData(accessToken, { activeFilter: next, offset: 0 });
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
                void loadData(accessToken, { offset: 0 });
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
                  users.map((item) => (
                    <tr key={item.id} className="border-b border-border/50 last:border-0">
                      <td className="px-4 py-4 align-top">
                        <p className="font-semibold text-foreground">
                          {item.full_name || item.username}
                        </p>
                        <p className="text-xs text-muted-foreground">{item.email}</p>
                        <p className="text-xs text-muted-foreground">@{item.username}</p>
                      </td>
                      <td className="px-4 py-4 align-top">
                        {item.apps.length === 0 ? (
                          <span className="text-muted-foreground">—</span>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            {item.apps.map((app) => (
                              <span
                                key={`${item.id}-${app}`}
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
                            item.is_active ? "text-emerald-700" : "text-muted-foreground"
                          }
                        >
                          {item.is_active ? "Activo" : "Inactivo"}
                        </span>
                        {!item.is_verified ? (
                          <p className="mt-1 text-xs text-amber-700">Não verificado</p>
                        ) : null}
                      </td>
                      <td className="px-4 py-4 align-top text-muted-foreground">
                        {formatDate(item.created_at)}
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
                  const next = Math.max(0, offset - PAGE_SIZE);
                  setOffset(next);
                  void loadData(accessToken, { offset: next });
                }}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!canNext || loading}
                onClick={() => {
                  const next = offset + PAGE_SIZE;
                  setOffset(next);
                  void loadData(accessToken, { offset: next });
                }}
              >
                Seguinte
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
