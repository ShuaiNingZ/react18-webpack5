// 路由切换动画
export enum RouterTransitionEnum {
    ZOOM_FADE = 'zoom-fade',
    ZOOM_OUT = 'zoom-out',
    FADE_SIDE = 'fade-slide',
    FADE = 'fade',
    FADE_BOTTOM = 'fade-bottom',
    FADE_SCALE = 'fade-scale'
}

// 主题
export enum ThemeEnum {
    LIGHT = 'light',
    DARK = 'dark'
}

export type themeType = (typeof ThemeEnum)[keyof typeof ThemeEnum];

// 语言
export enum LanguageEnum {
    ZH_CN = 'zh_CN',
    ZH_TW = 'zh_TW',
    EN_US = 'en_US'
}

export type languageType = (typeof LanguageEnum)[keyof typeof LanguageEnum];

// 语言列表
export const LANGUAGE_LIST = [
    {
        label: '简体中文',
        value: LanguageEnum.ZH_CN
    },
    {
        label: '繁体中文',
        value: LanguageEnum.ZH_TW
    },
    {
        label: 'English',
        value: LanguageEnum.EN_US
    }
];

export interface appSettingType {
    language: languageType;
    theme: themeType;
}

export const appSetting: appSettingType = {
    language: LanguageEnum.ZH_CN,
    theme: ThemeEnum.LIGHT
};
