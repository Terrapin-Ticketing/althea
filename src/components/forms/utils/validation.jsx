export const isValidEmail = (email) => {
    var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (emailRegEx.test(String(email))) ? undefined : 'Invalid email'
}

export const isPresent = (value) => {
    return (typeof value === 'undefined') ? 'Required' : undefined
}