const AUTH0_TENANT_NAME = 'sophon';

function getDomain(stage) {
  let domain = 'sophon-web';

  if (stage !== 'prd') {
    domain = domain + '-' + stage;
  }

  return domain;
}

export function signInUrl(stage, clientId, state) {
  return (
    `https://${AUTH0_TENANT_NAME}.auth0.com/login?` +
    [
      `redirect_uri=https://${getDomain(stage)}.now.sh/in`,
      'response_type=token',
      `client=${clientId}`,
      `state=${state}`
    ].join('&')
  );
}

export function signOutUrl(stage, clientId) {
  return (
    `https://${AUTH0_TENANT_NAME}.auth0.com/v2/logout?` +
    [
      `client_id=${clientId}`,
      `returnTo=https://${getDomain(stage)}.now.sh/out`
    ].join('&')
  );
}
