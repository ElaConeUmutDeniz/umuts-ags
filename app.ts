import app from "ags/gtk4/app"
import style from "./style.scss"
import Bar from "./widget/Bar"
import { Astal } from "ags/gtk4"
import { NotificationService } from "./widget/notification"
import Desktop from "./background"
import { exec } from "ags/process"
import { RequestHandler } from "./requestHandler"
app.start({
  css: style,
  requestHandler: RequestHandler,
  main() {
    app.get_monitors().map(Desktop)
    app.get_monitors().map(Bar)
    NotificationService()
  },
})
