export const required = (value: any) => value ? undefined : 'Required';

export const maxLength = (max: any) => (value: any) =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = (min: any) => (value: any) =>
    value && value.length < min ? `Must be ${min} characters or less` : undefined;

export const minLength4 = minLength(4);

export const maxLength15 = maxLength(15);

export const emailValidator = (value: string) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined;