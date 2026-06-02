import { Component, inject, OnInit } from "@angular/core";
import { AuthStore } from "../../core/shared/state/auth.store";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  standalone: true,
  imports: [NavbarComponent],
  template: `
    <div class="flex h-screen overflow-hidden bg-[#f7f3ed] text-[#11130f]">
      <app-navbar />

      <main class="min-w-0 flex-1 overflow-y-auto">
        <header class="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-[#e4dbcf] bg-[#f7f3ed]/95 px-8 backdrop-blur">
          <div class="flex h-12 w-full max-w-xl items-center gap-3 rounded-2xl border border-[#ded6cb] bg-white px-4 shadow-sm">
            <span class="text-[#7c746a]" aria-hidden="true">?</span>
            <input
              class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#7c746a]"
              type="search"
              placeholder="Search experiences and chefs..."
            />
            <span class="rounded-md bg-[#eee8df] px-2 py-1 text-xs text-[#766c60]">Ctrl K</span>
          </div>

          <div class="ml-6 flex items-center gap-3">
            <button class="flex size-12 items-center justify-center rounded-2xl border border-[#ded6cb] bg-white text-lg shadow-sm" type="button">
              !
            </button>
            <button class="flex size-12 items-center justify-center rounded-2xl border border-[#ded6cb] bg-white text-lg shadow-sm" type="button">
              *
            </button>
          </div>
        </header>

        <section class="mx-auto max-w-7xl px-8 py-9">
          <div class="rounded-[28px] bg-[#1b120d] px-12 py-11 text-white shadow-xl shadow-[#4b3424]/15">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#d9a653]">Tuesday, June 2</p>
            <h1 class="mt-4 max-w-4xl font-serif text-5xl leading-tight">
              Good evening, {{ firstName }}. Your next table is almost set.
            </h1>
            <p class="mt-5 max-w-2xl text-base leading-7 text-[#d8cfc2]">
              Chef Amelie is preparing the seasonal tasting menu for your party of six this Saturday.
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <button class="rounded-xl bg-[#d9a653] px-6 py-3 text-sm font-semibold text-[#17130d]" type="button">
                Browse experiences
              </button>
              <button class="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-white" type="button">
                View bookings
              </button>
            </div>
          </div>

          <div class="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            @for (stat of stats; track stat.label) {
            <article class="rounded-3xl border border-[#e1d8cb] bg-white p-6 shadow-sm">
              <div class="mb-8 flex items-center justify-between">
                <span class="flex size-10 items-center justify-center rounded-2xl bg-[#eee8df] text-[#264031]">{{ stat.icon }}</span>
                <span class="text-xl text-[#6f675e]">↗</span>
              </div>
              <p class="font-serif text-3xl">{{ stat.value }}</p>
              <p class="mt-2 text-sm font-medium">{{ stat.label }}</p>
              <p class="mt-1 text-xs text-[#6f675e]">{{ stat.detail }}</p>
            </article>
            }
          </div>

          <div class="mt-10 flex items-end justify-between">
            <div>
              <h2 class="font-serif text-3xl">Upcoming experiences</h2>
              <p class="mt-2 text-sm text-[#6f675e]">Your reserved chef visits, in order of date.</p>
            </div>
            <button class="text-sm font-medium text-[#173c29]" type="button">See all</button>
          </div>

          <div class="mt-6 grid gap-5 lg:grid-cols-2">
            <article class="overflow-hidden rounded-3xl border border-[#e1d8cb] bg-white shadow-sm">
              <img src="/assets/images/login-decor-3.jpg" alt="" class="h-52 w-full object-cover" />
              <div class="p-6">
                <p class="text-sm text-[#6f675e]">Saturday dinner</p>
                <h3 class="mt-1 font-serif text-2xl">Seasonal tasting menu</h3>
              </div>
            </article>
            <article class="overflow-hidden rounded-3xl border border-[#e1d8cb] bg-white shadow-sm">
              <img src="/assets/images/login-decor-4.jpg" alt="" class="h-52 w-full object-cover" />
              <div class="p-6">
                <p class="text-sm text-[#6f675e]">Pending confirmation</p>
                <h3 class="mt-1 font-serif text-2xl">Private wine pairing</h3>
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
    { icon: "[]", value: "2", label: "Upcoming experiences", detail: "Next in 4 days" },
    { icon: "/", value: "5", label: "Lifetime bookings", detail: "+2 this quarter" },
    { icon: "$", value: "$8,420", label: "Total invested", detail: "Avg $1,053 / event" },
    { icon: "*", value: "Curator", label: "Member status", detail: "Top 5% of guests" },
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
