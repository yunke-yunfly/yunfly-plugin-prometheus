/**
 * get url path
 *
 * @param {string} url
 * @return {*}  {string}
 */
export const getPath = (url: string): string => {
  if (!url) {
    return '';
  }

  if (url.indexOf('?') === -1) {
    return url;
  }

  const path = url.split('?')[0];
  return path;
};
