import { Context } from "koishi";
import { Config } from "./config";

export function addTranslation(ctx: Context) {
  const config = ctx.config as Config;
  // I18n for faq command
  ctx.i18n.define("zh-CN", {
    [`commands.emerald-faq_${config.identifier}`]:
      require("./locale/zh-CN.json").command_faq,
  });

  // I18n entry for faq items
  ctx.i18n.define(config.defaultLocale, {
    [`emerald-faq.${config.identifier}`]: config.items,
  });
}
