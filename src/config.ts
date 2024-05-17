import { Schema } from "koishi";

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
