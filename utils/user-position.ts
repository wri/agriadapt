const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

export const getUserPosition = (success) => {
    return (
        navigator.geolocation.getCurrentPosition(success, error)
    )
}