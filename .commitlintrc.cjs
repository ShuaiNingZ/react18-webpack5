module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // @see: https://commitlint.js.org/#/reference-rules
    },
    prompt: {
        messages: {
            type: '选择你要提交的类型 :',
            scope: '选择一个提交范围（可选）:',
            customScope: '请输入自定义的提交范围 :',
            subject: '填写简短精炼的变更描述 :\n',
            body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
            breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
            footerPrefixesSelect: '选择关联issue前缀（可选）:',
            customFooterPrefix: '输入自定义issue前缀 :',
            footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
            confirmCommit: '是否提交或修改commit ?'
        },
        types: [
            {
                value: 'feat',
                name: 'feat:     新增功能 | A new feature'
            },
            {
                value: 'fix',
                name: 'fix:      修复缺陷 | A bug fix'
            },
            {
                value: 'style',
                name: 'style:    代码格式 | Changes that do not affect the meaning of the code'
            },
            {
                value: 'perf',
                name: 'perf:     性能提升 | A code change that improves performance'
            },
            {
                value: 'refactor',
                name: 'refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature'
            },
            {
                value: 'test',
                name: 'test:     测试相关 | Adding missing tests or correcting existing tests'
            },
            {
                value: 'chore',
                name: 'chore:    其他修改 | Other changes that do not modify src or test files'
            },
            {
                value: 'docs',
                name: 'docs:     文档更新 | Documentation only changes'
            },
            {
                value: 'workflow',
                name: 'workflow:     工作流 | workflow'
            },
            {
                value: 'build',
                name: 'build:    构建相关 | Changes that affect the build system or external dependencies'
            },
            {
                value: 'ci',
                name: 'ci:       持续集成 | Changes to our CI configuration files and scripts'
            },
            {
                value: 'revert',
                name: 'revert:   回退代码 | Revert to a commit'
            },
            {
                value: 'release',
                name: 'release:   发版 | Release'
            },
            {
                value: 'deps',
                name: 'deps:   依赖 | dependent'
            },
            {
                value: 'wip',
                name: 'wip:   工作中 还未完成 | work in progress'
            }
        ],
        useEmoji: false
    }
};
