import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"
import { Accessor } from "gnim"
import { createPoll } from "ags/time"

export default function Desktop(gdkmonitor: Gdk.Monitor) {
  return (
    <window
    name="desktop"
      visible={true}
      exclusivity={Astal.Exclusivity.IGNORE}
      anchor={
        Astal.WindowAnchor.TOP |
        Astal.WindowAnchor.BOTTOM |
        Astal.WindowAnchor.LEFT |
        Astal.WindowAnchor.RIGHT
      }
      layer={Astal.Layer.BACKGROUND}
      keymode={Astal.Keymode.NONE}
      gdkmonitor={gdkmonitor}
    >
      
      <box 
        css={`
          background-image: url('https://cdns3.royaleapi.com/cdn-cgi/image/w=150,h=180,format=auto/static/img/cards/v11-a8e42334/hog-rider.png'); 
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        `}
      ></box>
    </window>
  )
}
