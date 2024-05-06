module.exports = {
    /* 继承公共配置 */
    extends: [
        'stylelint-config-recommended-scss',
        'stylelint-config-standard-scss',
        'stylelint-config-recess-order',
        'stylelint-config-standard'
    ],
    /* 项目个性化的规则 */
    rules: {
        // 命名规范
        'selector-class-pattern': [
            '^[a-z]+([A-Z][a-z]*)*\\d*$',
            {
                message: 'Expected class selector to be lowerCamelCase'
            }
        ]
    }
};
