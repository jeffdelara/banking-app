const DATA = [
    {
        email: "admin@admin.com",
        password: "abc123",
        fullname: "Admin Account",
        type: "Savings Peso",
        number: "47290539480",
        balance: 1000,
        isAdmin: true
    },
    {
        email: "jeff@gmail.com",
        password: "abc123",
        fullname: "Jeffrey de Lara",
        type: "Savings Peso",
        number: "47290539481",
        balance: 1029300.43,
        isAdmin: true
    },
    {
        email: "jeff2@gmail.com",
        password: "abc123",
        fullname: "Juan dela Cruz",
        type: "Savings Peso",
        number: "47290539482",
        balance: 392830.22,
        isAdmin: false, 
        budget: [
            {
                title: "Tuition fee",
                amount: 12000
            },
            {
                title: "Food take out during the pandemic",
                amount: 4000
            }
        ]
    },
    {
        email: "user24@gmail.com",
        password: "abc123",
        fullname: "Peter de Castro",
        type: "Savings Peso",
        number: "47290539483",
        balance: 102938.34,
        isAdmin: false
    },
    {
        email: "user34@gmail.com",
        password: "abc123",
        fullname: "Noli Enriquez",
        type: "Checking Peso",
        number: "47290539484",
        balance: 837495.38, 
        isAdmin: false
    },

    {
        email: "derek@gmail.com",
        password: "abc123",
        fullname: "Karen Davila",
        type: "Checking Peso",
        number: "47290539485",
        balance: 574839.58, 
        isAdmin: false
    }
];

export default DATA;
