module.exports = ({ env }) => ({
  'duplicate-button': true,
  graphql: {
    enabled: true,
    shadowCRUD: false,
    config: {
      cd: false,
      defaultLimit: 50
    }
  }
});
