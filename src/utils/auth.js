const AUTH0_TENANT_NAME = "sophon";

function getCallbackUrlPrefix() {
  if (window && window.location) {
    if (window.location.port) {
      return `${window.location.protocol}//${window.location.hostname}:${
        window.location.port
      }`;
    } else {
      return `${window.location.protocol}//${window.location.hostname}`;
    }
  } else {
    return "https://sophon-web-dev.now.sh";
  }
}

export function signInUrl(clientId, state) {
  return (
    `https://${AUTH0_TENANT_NAME}.auth0.com/login?` +
    [
      `scope=openid%20profile%20email`,
      `redirect_uri=${getCallbackUrlPrefix()}/in`,
      "response_type=token",
      `client=${clientId}`,
      `state=${state}`
    ].join("&")
  );
}

export function signOutUrl(clientId) {
  return (
    `https://${AUTH0_TENANT_NAME}.auth0.com/v2/logout?` +
    [`client_id=${clientId}`, `returnTo=${getCallbackUrlPrefix()}/out`].join(
      "&"
    )
  );
}
