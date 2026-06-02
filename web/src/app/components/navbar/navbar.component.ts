import { NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthStore } from "../../core/shared/state/auth.store";

type NavItem = {
  label: string;
  route: string;
  icon: string;
  active?: boolean;
};

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent {
  protected readonly authStore = inject(AuthStore);
  protected collapsed = false;

  protected readonly navItems: NavItem[] = [
    {
      label: "Dashboard",
      route: "/dashboard",
      icon: "pi-th-large",
      active: true,
    },
    { label: "Experiences", route: "/dashboard", icon: "pi-sparkles" },
    { label: "My Bookings", route: "/dashboard", icon: "pi-calendar" },
  ];

  protected get userName(): string {
    console.log(this.authStore.currentUser());
    return this.authStore.currentUser()?.fullName ?? "Eleanor Hayes";
  }

  protected get userInitial(): string {
    return this.userName.trim().charAt(0).toUpperCase() || "E";
  }

  protected toggle(): void {
    this.collapsed = !this.collapsed;
  }
}
