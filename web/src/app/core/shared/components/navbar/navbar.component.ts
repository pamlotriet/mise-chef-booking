import { NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { TranslatePipe } from "@ngx-translate/core";
import { AuthStore } from "@store/authStore/auth.store";

type NavItem = {
  labelKey: string;
  route: string;
  icon: string;
  active?: boolean;
  role: Array<string>;
};

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [NgClass, RouterLink, TranslatePipe],
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent {
  protected readonly authStore = inject(AuthStore);
  protected collapsed = false;

  protected get userRole(): string {
    return this.authStore.currentUser()?.roles?.[0]?.toLowerCase() ?? "";
  }

  protected readonly navItems: NavItem[] = [
    {
      labelKey: "nav.dashboard",
      route: "/dashboard",
      icon: "pi-th-large",
      active: true,
      role: ["admin", "user"],
    },
    {
      labelKey: "nav.experiences",
      route: "/dashboard",
      icon: "pi-sparkles",
      role: ["user"],
    },
    {
      labelKey: "nav.myBookings",
      route: "/dashboard",
      icon: "pi-calendar",
      role: ["user"],
    },
    {
      labelKey: "nav.services",
      route: "/dashboard",
      icon: "pi-calendar",
      role: ["admin"],
    },
    {
      labelKey: "nav.bookings",
      route: "/dashboard",
      icon: "pi-calendar",
      role: ["admin"],
    },
    {
      labelKey: "nav.payments",
      route: "/dashboard",
      icon: "pi-calendar",
      role: ["admin"],
    },
    {
      labelKey: "nav.users",
      route: "/dashboard",
      icon: "pi-calendar",
      role: ["admin"],
    },
  ];

  protected get userName(): string {
    return this.authStore.currentUser()?.fullName ?? "Eleanor Hayes";
  }

  protected get userInitial(): string {
    return this.userName.trim().charAt(0).toUpperCase() || "E";
  }

  protected toggle(): void {
    this.collapsed = !this.collapsed;
  }

  protected canShowNavigationItem(itemRole: Array<string>): boolean {
    return itemRole.some((role) => role.toLowerCase() === this.userRole);
  }
}
