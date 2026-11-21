import { Gtk, Astal } from "ags/gtk4"
import GLib from "gi://GLib?version=2.0"
import { exec } from "ags/process"

export function RequestHandler(request: string[], response: any) {
  const appInstance = Gtk.Application.get_default() as any
  if (!appInstance) {
    response("Application instance not found.")
    return
  }

  let bars = appInstance.get_windows().filter((w: any) => w.name === "bar")

  if (request[0] === "toggle") {
    const desktop = GLib.getenv("XDG_CURRENT_DESKTOP") || ""

    try {
      if (desktop === "niri") {
        const niriWorkspaces = JSON.parse(exec("niri msg -j workspaces"))
        const focusedWorkspace = niriWorkspaces.find((w: any) => w.is_focused)
        if (focusedWorkspace) {
          bars = bars.filter(
            (w: any) => (w as any).gdkmonitor.connector === focusedWorkspace.output,
          )
        }
      } else if (desktop === "Hyprland") {
        const hyprMonitors = JSON.parse(exec("hyprctl monitors -j"))
        const focusedMonitor = hyprMonitors.find((m: any) => m.focused)
        if (focusedMonitor) {
          bars = bars.filter(
            (w: any) => (w as any).gdkmonitor.connector === focusedMonitor.name,
          )
        }
      }
    } catch (e) {
      console.error("Could not detect focused monitor:", e)
    }

    const firstBar = bars[0]
    if (firstBar) {
      const isCurrentlyOpen = firstBar.cssClasses.includes("open")
      for (const bar of bars) {
        if (isCurrentlyOpen) {
          bar.remove_css_class("open")
          bar.add_css_class("close")
          // Wait for slide animation (400ms) to complete before releasing screen space
          setTimeout(() => {
            if (bar && bar.cssClasses.includes("close")) {
              ;(bar as any).exclusivity = Astal.Exclusivity.IGNORE
            }
          }, 400)
        } else {
          // Instantly reserve screen space when opening so other windows don't overlap the sliding animation
          ;(bar as any).exclusivity = Astal.Exclusivity.EXCLUSIVE
          bar.remove_css_class("close")
          bar.add_css_class("open")
        }
      }
      response(isCurrentlyOpen ? "Closed." : "Toggled.")
    } else {
      response("No bars found.")
    }
  }
}