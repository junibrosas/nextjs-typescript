const withTypescript = require('@zeit/next-typescript');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

const domain = 'http://localhost:3030';
const lsPrefix = 'el.';

module.exports = withPlugins([withTypescript, withCSS, withFonts, withImages], {
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  publicRuntimeConfig: {
    api: {
      users: domain + '/users',
      auth: domain + '/authentication',
      authmgmt: domain + '/authmanagement',
      subjects: domain + '/subjects',
      courses: domain + '/courses',
      modules: domain + '/modules',
      subscription: domain + '/subscription'
    },
    localStorage: {
      token: lsPrefix + 'token',
      user: lsPrefix + 'user',
      viewCrumb: lsPrefix + 'viewCrumb',
      cmsCrumb: lsPrefix + 'cmsCrumb',
      subscription: lsPrefix + 'subscription'
    } 
  }
});