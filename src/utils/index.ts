export const validatePincode = (pinCode: string) => {
    return /^(\d{4}|\d{6})$/.test(pinCode.trim());
}

export const sanitizePincode = (input: string): string => {
    // Remove all non-digit characters
    const digitsOnly = input.replace(/\D/g, '');

    // Limit to max 6 digits
    return digitsOnly.slice(0, 6);
};

export const sanitizeWeight = (input: string): string => {
    // Remove all non-digit characters (no decimals allowed)
    const digitsOnly = input.replace(/\D/g, '');

    return digitsOnly;
};