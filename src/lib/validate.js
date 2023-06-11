export function login_validate(values) {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be more than 8 characters';
    } else if (values.password.includes(' ')) {
        errors.password = 'Invalid password';
    }
    return errors;
}
export function register_validate(values) {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!values.name) {
        errors.name = 'Required';
    }
    // else if (values.name.includes(' ')) {
    //     errors.ame = 'Invalid name';
    // }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be more than 8 characters';
    } else if (values.password.includes(' ')) {
        errors.password = 'Invalid password';
    }

    if (!values.confirmpassword) {
        errors.confirmpassword = 'Required';
    } else if (values.password !== values.confirmpassword) {
        errors.confirmpassword = 'Password does not match';
    } else if (values.confirmpassword.includes(' ')) {
        errors.confirmpassword = 'Invalid password';
    }
    return errors;
}
