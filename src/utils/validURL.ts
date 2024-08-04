export function isValidURL(url: string) {
    // eslint-disable-next-line no-useless-escape
    const urlPattern = /^(https?:\/\/)(localhost|[\w.-]+(?:\.[\w\.-]+)*)(:\d+)?([\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+)?$/
;
    return urlPattern.test(url);
  }