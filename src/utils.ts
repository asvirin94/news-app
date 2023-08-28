export const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const secondPast = (now.getTime() - date.getTime()) / 1000;

    if(secondPast < 60) {
        return `${Math.floor(secondPast)} секунд назад`
    }
    if (secondPast < 3600) {
        return `${Math.floor(secondPast/60)} минут назад`
    }
    if(secondPast <= 86400) {
        return `${Math.floor(secondPast/3600)} ${[1, 21].includes(Math.floor(secondPast/3600))
        ? 'час'
        : [2, 3, 4, 22, 23, 24].includes(Math.floor(secondPast/3600))
            ? 'часа'
            : 'часов'
    } назад`
    }
    if(secondPast > 86400) {
        return `${Math.floor(secondPast/86400)} дней назад`
    }
}