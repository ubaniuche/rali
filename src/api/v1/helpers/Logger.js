import * as winston from "winston";
import "winston-daily-rotate-file";
import appRoot from "app-root-path";

const Logger = winston.createLogger({
    transports: [
        new winston.transports.DailyRotateFile({
            filename: "application-%DATE%.log",
            dirname: `${appRoot}/logs/`,
            level: "info",
            handleExceptions: true,
            colorize: true,
            json: false,
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
    exitOnError: false,
});

Logger.stream = {
    write(message) {
        Logger.info(message);
    },
};

export default Logger;