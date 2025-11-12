export const useCurrency = () => {
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString("es-AR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  const formatPrice = (price: number): string => {
    return `$${formatCurrency(price)}`;
  };

  return {
    formatCurrency,
    formatPrice,
  };
};
