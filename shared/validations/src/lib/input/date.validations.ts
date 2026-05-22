export function isValidDate(date: string): boolean {
    return !isNaN(new Date(date).getTime());
}

export function isOver18YearsOld(date: string): boolean {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18;
}