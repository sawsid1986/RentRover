const CurrencyFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

export default CurrencyFormatter;
