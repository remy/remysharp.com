module.exports = {
  commands: {
    _: 'cli/new',
    new: 'cli/new',
    publish: 'cli/publish',
    populate: 'cli/populate',
    search: 'cli/search',
    hello: 'cli/hello',
    'update-timestamps': 'cli/updateTimestamps'
  },
  alias: {
    'timestamps': 'update-timestamps'
  },
  booleans: ['debug']
};