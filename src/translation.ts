import { Context } from "koishi";
import { Config } from "./config";

export function addTranslation(ctx: Context) {
  const config = ctx.config as Config;
  // Regular i18n dict
  ctx.i18n.define("zh-CN", {
    ...Object.fromEntries([
      [
        `commands.emerald-faq_${config.i18nGroup}.messages`,
        require("./translation/zh-CN.yaml").messages,
      ],
    ]),
  });

  // I18n entry for faq items
  const faqDict = {
    "emerald-faq": {
      ...Object.fromEntries([[config.i18nGroup, config.items]]),
    },
  };
  ctx.i18n.define(config.defaultLocale, faqDict);
}
