exports.errorResponse = function (res, statusCode, code, message) {
    res.status(statusCode)
    return res.json({
        status: false,
        error: {
            code,
            message,
        },
    });
}

exports.successResponse = function (res, statusCode, data) {
    res.status(statusCode);
    return res.json({
        status: true,
        data,
    });
}
