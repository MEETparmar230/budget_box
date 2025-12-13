import localforage from "localforage";

const budgetDB = localforage.createInstance({
    name: "budgetbox",
    storeName: "budgets",
})

export default budgetDB;