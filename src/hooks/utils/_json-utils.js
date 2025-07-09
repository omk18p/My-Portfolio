/**
 * @author Omkar Patil
 * @date 2023-12-20
 */

export const _jsonUtils = {
    /**
     * @param {Object} json
     * @return {string}
     */
    sanitizeForLogs: (json) => {
        const hasFilledField = Object.values(json).some((value) => { return value })

        if(!hasFilledField)
            return ""

        return JSON.stringify(json).replaceAll(`",`, `",<br>`)
            .replaceAll(`":`, `": `)
            .replaceAll(`"`, ``)
            .replaceAll(`{`, ``)
            .replaceAll(`}`, ``)
            .replaceAll(` ,`, ``)
    }
}