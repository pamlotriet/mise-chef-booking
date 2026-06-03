import { Component, inject, OnInit } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { AuthStore } from "@store/authStore/auth.store";
import { NavbarComponent } from "@components/navbar/navbar.component";

@Component({
  standalone: true,
  imports: [NavbarComponent, TranslatePipe],
  template: `
    <div class="flex h-screen overflow-hidden bg-(--color-page-bg) text-(--color-text)">
      <app-navbar />

      <main class="min-w-0 flex-1 overflow-y-auto">
        <header
          class="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-(--color-border-muted) bg-(--color-page-bg-translucent) px-8 backdrop-blur"
        >
          <div
            class="flex h-12 w-full max-w-xl items-center gap-3 rounded-2xl border border-(--color-border) bg-(--color-surface) px-4 shadow-sm"
          >
            <span class="text-(--color-subtle)" aria-hidden="true">?</span>
            <input
              class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-(--color-subtle)"
              type="search"
              [placeholder]="'dashboard.searchPlaceholder' | translate"
            />
            <span
              class="rounded-md bg-(--color-surface-muted) px-2 py-1 text-xs text-(--color-muted)"
              >{{ "dashboard.shortcut" | translate }}</span
            >
          </div>

          <div class="ml-6 flex items-center gap-3">
            <button
              class="flex size-12 items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-surface) text-lg shadow-sm"
              type="button"
            >
              !
            </button>
            <button
              class="flex size-12 items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-surface) text-lg shadow-sm"
              type="button"
            >
              *
            </button>
          </div>
        </header>

        <section class="mx-auto max-w-7xl px-8 py-9">
          <div
            class="rounded-[28px] bg-(--color-hero-bg) px-12 py-11 text-(--color-primary-text) shadow-xl shadow-[color:var(--color-card-shadow)]"
          >
            <p
              class="text-xs font-semibold uppercase tracking-[0.28em] text-(--color-accent-strong)"
            >
              {{ "dashboard.date" | translate }}
            </p>
            <h1 class="mt-4 max-w-4xl font-serif text-5xl leading-tight">
              {{ "dashboard.greeting" | translate: { firstName } }}
            </h1>
            <p class="mt-5 max-w-2xl text-base leading-7 text-(--color-hero-muted)">
              {{ "dashboard.heroDescription" | translate }}
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <button
                class="rounded-xl bg-(--color-accent-strong) px-6 py-3 text-sm font-semibold text-(--nav-accent-contrast)"
                type="button"
              >
                {{ "dashboard.browseExperiences" | translate }}
              </button>
              <button
                class="rounded-xl border border-(--color-on-dark-border) px-6 py-3 text-sm font-semibold text-(--color-primary-text)"
                type="button"
              >
                {{ "dashboard.viewBookings" | translate }}
              </button>
            </div>
          </div>

          <div class="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            @for (stat of stats; track stat.labelKey) {
              <article
                class="rounded-3xl border border-(--color-border-soft) bg-(--color-surface) p-6 shadow-sm"
              >
                <div class="mb-8 flex items-center justify-between">
                  <span
                    class="flex size-10 items-center justify-center rounded-2xl bg-(--color-surface-muted) text-(--color-link-alt)"
                    >{{ stat.icon }}</span
                  >
                  <span class="text-xl text-(--color-muted)">↗</span>
                </div>
                <p class="font-serif text-3xl">{{ stat.valueKey ? (stat.valueKey | translate) : stat.value }}</p>
                <p class="mt-2 text-sm font-medium">{{ stat.labelKey | translate }}</p>
                <p class="mt-1 text-xs text-(--color-muted)">{{ stat.detailKey | translate }}</p>
              </article>
            }
          </div>

          <div class="mt-10 flex items-end justify-between">
            <div>
              <h2 class="font-serif text-3xl">{{ "dashboard.upcomingExperiences" | translate }}</h2>
              <p class="mt-2 text-sm text-(--color-muted)">
                {{ "dashboard.reservedChefVisits" | translate }}
              </p>
            </div>
            <button class="text-sm font-medium text-(--color-link-alt)" type="button">
              {{ "dashboard.seeAll" | translate }}
            </button>
          </div>

          <div class="mt-6 grid gap-5 lg:grid-cols-2">
            <article
              class="overflow-hidden rounded-3xl border border-(--color-border-soft) bg-(--color-surface) shadow-sm"
            >
              <img
                src="/assets/images/login-decor-3.jpg"
                alt=""
                class="h-52 w-full object-cover"
              />
              <div class="p-6">
                <p class="text-sm text-(--color-muted)">{{ "dashboard.saturdayDinner" | translate }}</p>
                <h3 class="mt-1 font-serif text-2xl">{{ "dashboard.seasonalTastingMenu" | translate }}</h3>
              </div>
            </article>
            <article
              class="overflow-hidden rounded-3xl border border-(--color-border-soft) bg-(--color-surface) shadow-sm"
            >
              <img
                src="/assets/images/login-decor-4.jpg"
                alt=""
                class="h-52 w-full object-cover"
              />
              <div class="p-6">
                <p class="text-sm text-(--color-muted)">{{ "dashboard.pendingConfirmation" | translate }}</p>
                <h3 class="mt-1 font-serif text-2xl">{{ "dashboard.privateWinePairing" | translate }}</h3>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  protected readonly authStore = inject(AuthStore);

  protected readonly stats = [
    {
      icon: "[]",
      value: "2",
      labelKey: "dashboard.stats.upcoming.label",
      detailKey: "dashboard.stats.upcoming.detail",
    },
    {
      icon: "/",
      value: "5",
      labelKey: "dashboard.stats.lifetime.label",
      detailKey: "dashboard.stats.lifetime.detail",
    },
    {
      icon: "$",
      value: "$8,420",
      labelKey: "dashboard.stats.invested.label",
      detailKey: "dashboard.stats.invested.detail",
    },
    {
      icon: "*",
      valueKey: "dashboard.stats.status.value",
      labelKey: "dashboard.stats.status.label",
      detailKey: "dashboard.stats.status.detail",
    },
  ];

  protected get firstName(): string {
    const name = this.authStore.currentUser()?.fullName ?? "Eleanor";
    return name.split(" ")[0] || "Eleanor";
  }

  ngOnInit(): void {
    if (!this.authStore.currentUser()) {
      this.authStore.loadCurrentUser().subscribe();
    }
  }
}
