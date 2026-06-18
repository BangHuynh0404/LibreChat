/**
 * Auth mode switch:
 * - `open`  — no login required; shared guest user session (default)
 * - `entra` — Microsoft Entra ID via OpenID Connect (requires OPENID_* env vars)
 */
const { isEnabled } = require('@librechat/api');

const AUTH_MODE = (process.env.AUTH_MODE || 'open').trim().toLowerCase();

const isAuthRequired = () => AUTH_MODE === 'entra';

const isOpenAuthMode = () => !isAuthRequired();

const getAuthMode = () => (isAuthRequired() ? 'entra' : 'open');

/** When Entra mode is active, honor OPENID_AUTO_REDIRECT; otherwise never auto-redirect. */
const isOpenIdAutoRedirectEnabled = () =>
  isAuthRequired() && isEnabled(process.env.OPENID_AUTO_REDIRECT);

module.exports = {
  AUTH_MODE,
  isAuthRequired,
  isOpenAuthMode,
  getAuthMode,
  isOpenIdAutoRedirectEnabled,
};
