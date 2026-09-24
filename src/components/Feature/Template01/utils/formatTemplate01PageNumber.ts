export const formatTemplate01PageNumber = (pageNumber: string) => {
  const digits = pageNumber.replace(/\D/g, '');
  const value = digits === '' ? pageNumber : Number(digits);

  return {
    label: `№ ${value}`,
    index:
      typeof value === 'number' ? String(value).padStart(2, '0') : pageNumber,
  };
};
