module.exports = () => {
  if (process.env.COMMIT_REF) {
    return process.env.COMMIT_REF;
  }

  if (process.env.npm_package_gitHead) {
    return process.env.npm_package_gitHead;
  }

  const spawn = require('child_process').spawnSync;

  const res = spawn('git', ['rev-parse', 'HEAD'], {
    cwd: process.cwd(),
  })
    .stdout.toString()
    .trim();

  return res;
};
