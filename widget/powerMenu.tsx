
import { Gtk, Gdk} from "ags/gtk4";
import { execAsync } from "ags/process";
import GLib from "gi://GLib";
export default function PowerMenu() {
  return (
    <box orientation={Gtk.Orientation.VERTICAL}>
      <button
        cursor={Gdk.Cursor.new_from_name("pointer", null)}
        css={"border-style: none"}
        onClicked={() =>
          execAsync([
            "bash",
            "-c",
            "echo -e 'Evett\nHayır' | fuzzel --font iosevka --dmenu -p 'Kapatmak için eminmisin?' | grep -q 'Evett' && loginctl poweroff",
          ])
        }
      >
        <label label={"⏻"} css="color: #eb6f92"></label>
      </button>

      <button
        cursor={Gdk.Cursor.new_from_name("pointer", null)}
        css={"border-style: none"}
        onClicked={() =>
          execAsync([
            "bash",
            "-c",
            "echo -e 'Evett\nHayır' | fuzzel --font iosevka --dmenu -p 'Yeniden başlatmak için eminmisin?' | grep -q 'Evett' && loginctl reboot",
          ])
        }
      >
        <label label={"󰜉"} css="color: rgb(62, 143, 176)"></label>
      </button>

      <button
        cursor={Gdk.Cursor.new_from_name("pointer", null)}
        css={"border-style: none"}
        onClicked={() => {
          const desktop = GLib.getenv("XDG_CURRENT_DESKTOP");
          switch (desktop) {
            case "niri":
              execAsync("niri msg action quit");
              break;
            default:
              const user = GLib.getenv("USER")
              execAsync("loginctl terminate-user " + user).catch(err =>{console.error(err)});
              break;
          }
        }}
      >
        <label label={"󰍃"}></label>
      </button>

      <button
        cursor={Gdk.Cursor.new_from_name("pointer", null)}
        css={"border-style: none"}
        onClicked={() => execAsync("loginctl suspend")}
      >
        <label label={"󰤄"} css="color: yellow"></label>
      </button>
    </box>
  );
}