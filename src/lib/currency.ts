import currency from "currency.js";
import currencySymbolMap from "currency-symbol-map";
export function currencyDisplay({
  amount,
  currencyCode = "usd",
}: {
  amount: number;
  currencyCode?: string;
}) {
  return currency(amount).format({
    separator: ",",
    precision: 2,
    symbol: currencySymbolMap(currencyCode),
  });
}
