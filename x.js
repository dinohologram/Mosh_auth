//Register: POST /api/users {name,email,password}

let userSchema = {

    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        max: 30,
        required: false,
        default: 'Ms. or Mr. User' 
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 80,
    
    }

}