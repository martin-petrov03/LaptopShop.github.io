const validate = (email, password) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email && email.length >= 5) {
        if (emailRegex.test(email)) {
            if (password && password.length >= 5) {
                return '';
            } else {
                return 'Password should be at least 5 characters!';
            }
        } else {
            return 'Invalid email!';
        }
    } else {
        return 'E-Mail should be at least 5 characters!';
    }
};

export default validate;