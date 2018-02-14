import { find, startsWith } from "lodash";

export function getAttrFromHash(hash, attribute) {
  if (hash.length < 2) {
    return null;
  }

  const attrs = hash.substring(1).split("&");

  const attr = find(attrs, a => startsWith(a, attribute + "="));

  if (attr) {
    return attr.substring(attribute.length + 1);
  } else {
    return null;
  }
}

function getHashFromUrl(url) {
  if (url.indexOf("#") > 0) {
    return url.substring(url.indexOf("#") + 1);
  } else {
    return null;
  }
}

export function getAttrFromUrl(url, attribute) {
  const hash = getHashFromUrl(url);

  if (hash) {
    return getAttrFromHash(hash, attribute);
  } else {
    return null;
  }
}
