let x = [2, 3, 5, "Vasu", false, 55];

console.log(x.push(7));

console.log(x.pop());

x.unshift(2);
console.log(x);
x.shift();
console.log(x);

let ram = {
  name: "CALVIN MUJI",
  feature: "AAJA BEER KUWAXA GAR JANEY BELA MAH",
  ADDRESS: "SANI AAMA SANGA BASXA ",
  TRANSOPORT: "BAU LEY EUTA BIKE KINDEKO XA ",
};

console.log(ram.TRANSOPORT);

let sita = {
  class: 9,
  add: {
    tole: "Sukumbasi",
    ward: 50,
  },
  phone: [9804064003, 9804086233],
};

console.log(sita.phone[1]);

let data = ["ram", "Hari", { section: ["A", "B"] }];

console.log(data[2].section[0]);

let students = [
  {
    id: 1,
    name: "Aarav Sharma",
    age: 20,
    major: "Computer Science",
    gpa: 3.8,
    address: {
      street: "123 Kanti Path",
      city: "Kathmandu",
      zip_code: "44600",
    },
  },
  {
    id: 2,
    name: "Sita Thapa",
    age: 21,
    major: "Data Science",
    gpa: 3.9,
    address: {
      street: "456 New Road",
      city: "Pokhara",
      zip_code: "33700",
    },
  },
  {
    id: 3,
    name: "Rohan Shrestha",
    age: 22,
    major: "Information Technology",
    gpa: 3.4,
    address: {
      street: "789 Main Street",
      city: "Lalitpur",
      zip_code: "44700",
    },
  },
  {
    id: 4,
    name: "Maya Rai",
    age: 19,
    major: "Software Engineering",
    gpa: 3.7,
    address: {
      street: "101 Link Road",
      city: "Biratnagar",
      zip_code: "56613",
    },
  },
  {
    id: 5,
    name: "Niranjan Joshi",
    age: 20,
    major: "Cybersecurity",
    gpa: 3.6,
    address: {
      street: "202 Bypass Road",
      city: "Chitwan",
      zip_code: "44200",
    },
  },
];

let studeents = [
  {
    id: 1,
    name: "Aarav Sharma",
    gpa: 3.8,
    courses: ["Web Development", "Database Systems", "Discrete Mathematics"],
    extracurriculars: ["Debate team", "Coding Bootcamp Mentor"],
  },
  {
    id: 2,
    name: "Sita Thapa",
    gpa: 3.9,
    courses: ["Machine Learning", "Linear Algebra", "Python Programming"],
    extracurriculars: ["Robotics Team", "Volleyball Club"],
  },
];


console.log(studeents[0].extracurriculars[0])


let xy = [1,7,3,4,5,9,2 ];

let filtered = xy.filter(x => x > 1)

console.log(filtered)


let finde = xy.find(f => f > 2)
console.log(finde)

let everyelement = xy.every(e => e == 2)
console.log(everyelement)

console.log(xy.map(m =>{
    m > 2 ? m * 2 : m * 5
  
} ))