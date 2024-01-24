export class RsUtils {
    private static LOG_PREFIX = "[RSiM]";

    public static log(message: string) {
        console.log(`${RsUtils.LOG_PREFIX} ${message}`);
    }

    public static warn(message: string) {
        console.warn(`${RsUtils.LOG_PREFIX} ${message}`);
    }

    public static error(message: string) {
        console.error(`${RsUtils.LOG_PREFIX} ${message}`);
    }
}