import { Context, Schema } from "koishi";

export const name = "emerald-faq";

export interface Config {
  defaultLocale: string;
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
  // Regular i18n dict
  ctx.i18n.define("zh-CN", require("./translation/zh-CN.yaml"));

  // I18n entry for faq items
  const faqDict = { "emerald-faq": { items: (ctx.config as Config).items } };
  ctx.i18n.define((ctx.config as Config).defaultLocale, faqDict);

  ctx.command("faq [item]").action(({ session }, item) => {
    // Flatten faq items for use
    const items = Object.entries((ctx.config as Config).items).map(
      ([key, { desc, content }]) => ({
        key,
        desc,
        content,
      })
    );

    // faq listing
    if (!item || item === "list") {
      if (items.length <= 0) return session.text(".noitems");

      return session.text(".list", { items });
    }

    const faqItemExists = !!items.find(({ key }) => item === key);
    if (!faqItemExists) return session.text(".notfound", [item]);

    return session.text(getItemContentI18nKey(item));
  });
}

const getItemContentI18nKey = (key: string) =>
  `emerald-faq.items.${key}.content`;
