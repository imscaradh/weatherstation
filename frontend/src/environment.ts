const prod = {
    restEndpoint: `//weather.binarycake.ch/api`
};


const dev = {
    restEndpoint: `//${window.location.hostname}:5000/api`
};

// Export configuration parameters according to current env
export var Config = (process.env.NODE_ENV !== 'production') ? dev : prod;
