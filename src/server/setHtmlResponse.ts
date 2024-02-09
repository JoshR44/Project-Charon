export const setHtmlResponse = (value: string | number) => {
  return `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="1"></head><body><h1>${value}</h1></body></html>`;
};

export const setHtmlResponseClock = (value: string | number) => {
  return `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0.25"></head><body><h1>${value}</h1></body></html>`;
};
