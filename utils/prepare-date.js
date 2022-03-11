export const prepareDates = (passedDate) => {
    try {
        const givenDate = new Date(passedDate);
        const month = givenDate.getMonth() + 1;
        const year = givenDate.getFullYear();
        const date = givenDate.getDate(); // passed date
        const nextDate = givenDate.getDate() + 1; // next day

        return {
            givenDay: `${year}-${month}-${date}`,
            nextDay: `${year}-${month}-${nextDate}`,
        }
    } catch (error) {
        console.log({ error });
    }
}
