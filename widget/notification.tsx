import Notifd from "gi://AstalNotifd?version=0.1";
import { Accessor, createState } from "gnim";
import { For } from "ags";
import Gtk from "gi://Gtk?version=4.0";
import Astal from "gi://Astal?version=4.0";
import app from "ags/gtk4/app";
import Pango from "gi://Pango?version=1.0";

const notifd = Notifd.get_default();

// get_notifications() already returns Notifd.Notification[]
let notificationList = [...notifd.get_notifications()].sort(
  (a, b) => b.time - a.time,
);
// Index 0 is guaranteed to be the chronologically newest notification

export function NotificationService() {
  notifd.connect("notified", (_, id) => {
    const n = notifd.get_notification(id);

    return (
      <window
        name="notification"
        visible={true}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        application={app}
        layer={Astal.Layer.OVERLAY}
      >
        <box class="notificationBox">
          <image file={n?.image} pixelSize={64}></image>
          <box orientation={Gtk.Orientation.VERTICAL}>
            <label label={n?.appName + " | " + n?.summary} maxWidthChars={50} ellipsize={Pango.EllipsizeMode.END} css="font-size: 16px" ></label>
            <label label={" " + n?.body} maxWidthChars={50} wrap wrapMode={Pango.WrapMode.WORD_CHAR} lines={4} ellipsize={Pango.EllipsizeMode.END} css="margin-top: 3px;"></label>
          </box>
        </box>
      </window>
    );
  });
}

export default function NotificationCenter() {
  return (
    <label></label>
  );
}