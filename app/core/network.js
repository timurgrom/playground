import _ from 'lodash';
import Promise from 'bluebird';
import superagent from 'superagent';
import superagentPromisePlugin from 'superagent-promise-plugin';

// Force using Bluebird Promise instead of native Promise
superagentPromisePlugin.Promise = Promise;
superagentPromisePlugin.patch(superagent);

import { API_URLS } from 'constants/api-urls';
import { PATTERNS } from 'constants/patterns';

/**
 * Private
 */

function getUrl(path) {
  // if the path starts with `http` it's probably for an external service
  if (PATTERNS.httpUrl.test(path)) {
    return path;
  }

  return API_URLS.API + path;
}

function getOptions(options) {
  return _.defaults(options, {
    // Fail the request after 30 seconds of no response
    timeout: 30000
  });
}

function getToken() {
  // Should return the user token
  // Consider just setting it somewhere and using directly
  return null;
}

export class Network {

  static get(path, options = {}) {
    return getToken()
      .then((token) => {
        const url    = getUrl(path);
        const config = getOptions(options);

        return superagent.get(url)
          .set('authorization', token)
          .timeout(config.timeout)
          .then((res) => res.body);
      });
  }

  static post(path, data, options = {}) {
    return getToken()
      .then((token) => {
        const url    = getUrl(path);
        const config = getOptions(options);

        return superagent.post(url, data)
          .set('authorization', token)
          .timeout(config.timeout)
          .then((res) => res.body);
      });
  }

  static put(path, data, options = {}) {
    return getToken()
      .then((token) => {
        const url    = getUrl(path);
        const config = getOptions(options);

        return superagent.put(url, data)
          .set('authorization', token)
          .timeout(config.timeout)
          .then((res) => res.body);
      });
  }

  static delete(path, data, options = {}) {
    return getToken()
      .then((token) => {
        const url    = getUrl(path);
        const config = getOptions(options);

        return superagent.delete(url, data)
          .set('authorization', token)
          .timeout(config.timeout)
          .then((res) => res.body);
      });
  }
}
