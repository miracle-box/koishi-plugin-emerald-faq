import { Context } from "koishi";
import { Config } from "./config";

export function addFaqCommand(ctx: Context) {
  const config = ctx.config as Config;

  ctx
    .command(`emerald-faq_${config.identifier} [item]`)
    .action(({ session }, item) => {
      // Flatten faq items for use
      const items = Object.entries(config.items).map(([key]) => ({
        key,
        desc: session.text(`emerald-faq.${config.identifier}.${key}.desc`),
        content: session.text(
          `emerald-faq.${config.identifier}.${key}.content`
        ),
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
