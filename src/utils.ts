function isNonEmptyString(input: unknown): boolean {
    if (typeof input !== 'string') return false;
    if (input.length === 0) return false;
    return true;
}

export { isNonEmptyString };
