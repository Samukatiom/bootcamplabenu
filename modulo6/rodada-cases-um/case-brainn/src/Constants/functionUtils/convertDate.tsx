const converteData = (date: string) => {
    const day = date.substring(8, 10)
    const month = date.substring(5, 7)
    const year = date.substring(0, 4)
    return `${day}/${month}/${year}`
};

export default converteData;