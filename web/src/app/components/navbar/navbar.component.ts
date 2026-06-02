import { NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthStore } from "../../core/shared/state/auth.store";

type NavItem = {
  label: string;
  route: string;
  icon: string;
  active?: boolean;
  role: Array<string>;
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

  // TODO: change to return a single role a user is only allowed to have one role
  protected readonly navItems: NavItem[] = [
    {
      label: "Dashboard",
      route: "/dashboard",
      icon: "pi-th-large",
      active: true,
      role: ["admin", "user"],
    },
    {
      label: "Experiences",
      route: "/dashboard",
      icon: "pi-sparkles",
      role: ["user"],
    },
    {
      label: "My Bookings",
      route: "/dashboard",
      icon: "pi-calendar",
      role: ["user"],
    },
    {
      label: "Services",
      route: "/dashboard",
      icon: "pi-calendar",
      role: ["admin"],
    },
    {
      label: "Bookings",
      route: "/dashboard",
      icon: "pi-calendar",
      role: ["admin"],
    },
    {
      label: "Payments",
      route: "/dashboard",
      icon: "pi-calendar",
      role: ["admin"],
    },
    {
      label: "Users",
      route: "/dashboard",
      icon: "pi-calendar",
      role: ["admin"],
    },
  ];

  protected get userName(): string {
    console.log(this.authStore.currentUser());
    this.showNavigationBasedOnRole(this.navItems[0].role);
    return this.authStore.currentUser()?.fullName ?? "Eleanor Hayes";
  }

  protected get userInitial(): string {
    return this.userName.trim().charAt(0).toUpperCase() || "E";
  }

  protected toggle(): void {
    this.collapsed = !this.collapsed;
  }
  // TODO: change to return a single role a user is only allowed to have one role
  //TODO: Update this to lowercase scenario better
  protected showNavigationBasedOnRole(itemRole: Array<string>) {
    let userRole = this.authStore.currentUser()?.roles || "";
    itemRole.forEach((itemRole) => {
      itemRole = itemRole.toLowerCase();
    });
    if (itemRole.includes(userRole[0].toLowerCase())) {
      return true;
    }
    return true;
  }
}
