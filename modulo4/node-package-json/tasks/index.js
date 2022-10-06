//3

const tasks = ["Estudar", "Arrumar a Casa", "Revisar o Front"]

const addTask = () => {
    tasks.push(process.argv[2])

    return tasks
}

console.log(addTask())