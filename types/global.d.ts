declare type ITypeObject<T> = Record<any, T>;
declare type IAnyObject = ITypeObject<any>;

// 语言
declare type AppLanguage = 'zh_CN' | 'zh_TW' | 'en_US';

// 环境
declare type AppEnv = 'development' | 'production';
