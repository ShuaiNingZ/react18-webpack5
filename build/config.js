const ROOT_PATH = process.cwd();

const isEnv = (env) => {
    return process.env.NODE_ENV === env
}

module.exports = {
    ROOT_PATH,
    isEnv
}
