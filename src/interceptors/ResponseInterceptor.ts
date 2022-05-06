export const success = (message, results, statusCode): Object => {
    return {
        message,
        error: false,
        code: statusCode,
        results
    }
}

export const error = (message, statusCode): Object => {
    const codes = [200, 201, 400, 401, 404, 403, 422, 500]

    const findCode = codes.find((code) => code == statusCode)

    if (!findCode) statusCode = 500;
    else statusCode = findCode;

    return {
        message,
        code: statusCode,
        error: true
    }
}
