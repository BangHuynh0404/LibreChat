const { SystemRoles } = require('librechat-data-provider');
const { logger } = require('@librechat/data-schemas');
const { findUser, createUser, getUserById } = require('~/models');
const { setAuthTokens } = require('~/server/services/AuthService');
const { getAppConfig } = require('~/server/services/Config');
const { isOpenAuthMode } = require('~/server/utils/authMode');

const GUEST_EMAIL = (process.env.GUEST_USER_EMAIL || 'guest@librechat.local').trim().toLowerCase();
const GUEST_NAME = process.env.GUEST_USER_NAME || 'Guest';
const GUEST_USERNAME = (process.env.GUEST_USER_USERNAME || 'guest').trim().toLowerCase();

const ensureGuestUser = async () => {
  const existing = await findUser({ email: GUEST_EMAIL });
  if (existing) {
    return existing;
  }

  const appConfig = await getAppConfig({ baseOnly: true });
  const created = await createUser(
    {
      email: GUEST_EMAIL,
      name: GUEST_NAME,
      username: GUEST_USERNAME,
      provider: 'local',
      role: SystemRoles.USER,
      emailVerified: true,
    },
    appConfig?.balance,
    true,
    true,
  );

  const userId = created?._id ?? created;
  logger.info(`[GuestAuthService] Created shared guest user: ${GUEST_EMAIL}`);
  return getUserById(userId);
};

const attachGuestUser = async (req, res, next) => {
  if (!isOpenAuthMode()) {
    return next(new Error('Guest auth is only available when AUTH_MODE=open'));
  }

  try {
    const user = await ensureGuestUser();
    req.user = user;
    req.authStrategy = 'guest';
    next();
  } catch (error) {
    next(error);
  }
};

const issueGuestAuthTokens = async (req, res) => {
  const user = await ensureGuestUser();
  const token = await setAuthTokens(user._id, res, null, req);
  return { token, user };
};

module.exports = {
  GUEST_EMAIL,
  ensureGuestUser,
  attachGuestUser,
  issueGuestAuthTokens,
};
