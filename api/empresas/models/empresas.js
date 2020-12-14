const slugify = require('slugify');

module.exports = {
  /**
   * Triggered before user creation.
   */
  lifecycles: {
    async beforeCreate(data) {
      if (data.social) {
        data.slug = slugify(data.social, {lower: true});
      }
    },
    async beforeUpdate(params, data) {
      if (data.social) {
        data.slug = slugify(data.social, {lower: true});
      }
    },
  },
};