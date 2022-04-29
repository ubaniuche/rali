class CustomError extends Error {
    constructor(statusCode, message, metaData = {}) {
        super(message);

        this.statusCode = statusCode;

        this.message = message;

        this.metaData = metaData;
    }

    setMetaData(data) {
        this.metaData = data;
    }
}

export default CustomError;