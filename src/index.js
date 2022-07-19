import './styles/main.scss';

const contact = {
    name: "Jane",
    email: "jsmith@gmail.com",
    age: 26
};

const employee = {
    ...contact,
    salary: 50000
};

console.log(contact);
console.log(employee);