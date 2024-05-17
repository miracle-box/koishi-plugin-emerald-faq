import { Context, Schema } from "koishi";

export const name = "emerald-faq";
export const reusable = true;

export interface Config {
  defaultLocale: string;
  i18nGroup: string;
  items: Record<
    string,
    {
      desc: string;
      content: string;
    }
  >;
}

export const Config: Schema<Config> = Schema.object({
  defaultLocale: Schema.string().default("zh-CN"),
  i18nGroup: Schema.string().required().default("items"),
  items: Schema.dict(
    Schema.object({
      desc: Schema.string(),
      content: Schema.string(),
    })
  ).role("table"),
}).i18n({
  "zh-CN": require("./translation/zh-CN.yaml")._config,
});

export function apply(ctx: Context) {
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

  ctx
    .command(`emerald-faq_${config.i18nGroup} [item]`)
    .action(({ session }, item) => {
      // console.log(session.resolve(config.comp));

      // Flatten faq items for use
      const items = Object.entries(config.items).map(([key]) => ({
        key,
        desc: session.text(`emerald-faq.${config.i18nGroup}.${key}.desc`),
        content: session.text(`emerald-faq.${config.i18nGroup}.${key}.content`),
      }));

      // faq listing
      if (!item || item === "list") {
        if (items.length <= 0) return session.text(".noitems");

        return session.text(".list", { items });
      }

      const requestedItem = items.find(({ key }) => item === key);
      if (!requestedItem) return session.text(".notfound", [item]);

      return requestedItem.content;
    });
}
