const { override } = require('customize-cra');

module.exports = override(
    // Ваши настройки тут, в данном случае настройка для fs и crypto:
    config => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            crypto: false
        };
        return config;
    }
);