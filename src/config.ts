import { Schema } from "koishi";

export interface Config {
  identifier: string;
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
  identifier: Schema.string().required().default("items"),
  defaultLocale: Schema.string().default("zh-CN"),
  items: Schema.dict(
    Schema.object({
      desc: Schema.string(),
      content: Schema.string(),
    })
  ).role("table"),
}).i18n({
  "zh-CN": require("./locale/zh-CN.json")._config,
});
