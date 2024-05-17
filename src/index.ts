import { Context, Schema } from "koishi";
import { addTranslation } from "./translation";
import { addFaqCommand } from "./command";

export { Config } from "./config";

export const name = "emerald-faq";
export const reusable = true;

export function apply(ctx: Context) {
  addTranslation(ctx);
  addFaqCommand(ctx);
}
