import app from "ags/gtk4/app";
import { Astal, Gtk, Gdk } from "ags/gtk4";
import { execAsync } from "ags/process";
import { Accessor } from "gnim";
import NotificationCenter from "./notification";
import { Weather } from "./weather";
import { createPoll } from "ags/time";
import PowerMenu from "./powerMenu"
export default function Bar(gdkmonitor: Gdk.Monitor) {
  const timeModified = createPoll(
    "",
    1000,
    () =>
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        timeZone: "Etc/GMT-3",
        hour12: false,
      }) +
      "\n\n" +
      new Date().toLocaleTimeString("en-GB", {
        minute: "2-digit",
        timeZone: "Etc/GMT-3",
        hour12: false,
      }),
  );

  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;
  return (
    <window
      visible
      name="bar"
      class="open"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | LEFT}
      application={app}
    >
      <centerbox cssName="centerbox" orientation={Gtk.Orientation.VERTICAL}>
        <button
          $type="start"
          onClicked={() => execAsync("fuzzel --font iosevka")}
          hexpand
          halign={Gtk.Align.CENTER}
        >
          <image file="/home/umut/Rice/6825955-middle-3319096616.png"></image>
        </button>
        <box $type="center" />
        <box $type="end" orientation={Gtk.Orientation.VERTICAL}>
          <menubutton $type="end" halign={Gtk.Align.CENTER} cursor={Gdk.Cursor.new_from_name("pointer", null)}>
            <label label={Weather} wrap maxWidthChars={4} useMarkup={true}/>
          </menubutton>
          <menubutton $type="end" hexpand halign={Gtk.Align.CENTER}>
            <label label={timeModified} wrap maxWidthChars={8} wrapMode={2} />
          </menubutton>
          <menubutton
            $type="end"
            halign={Gtk.Align.CENTER}
            css={"margin-top: 8px"}
            cursor={Gdk.Cursor.new_from_name("pointer", null)}
          >
            <label label={""} wrap maxWidthChars={4} />
            <popover hasArrow={false} class="NotificationCenter">
<NotificationCenter />
            </popover>
          </menubutton>
          <menubutton
            $type="end"
            halign={Gtk.Align.CENTER}
            css={"border: 1px solid red; border-radius: 25px; margin-top: 4px;"}
            cursor={Gdk.Cursor.new_from_name("pointer", null)}
          >
            <label label={"󰐦"} wrap maxWidthChars={4} />
            <popover hasArrow={false} class="PowerMenu">
             <PowerMenu />
            </popover>
          </menubutton>
        </box>
      </centerbox>
    </window>
  );
}
