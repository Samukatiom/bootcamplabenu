export const convertCpf = ( cpfUser : string) => {
    const firstGroupNumbers = cpfUser.substring(0, 3)
    const secondGroupNumbers = cpfUser.substring(3, 6)
    const thirdGroupNumbers = cpfUser.substring(6, 9)
    const digit = cpfUser.substring(9,)

    return `${firstGroupNumbers}.${secondGroupNumbers}.${thirdGroupNumbers}-${digit}`
}