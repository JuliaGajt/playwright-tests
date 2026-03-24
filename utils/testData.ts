type User = { 
    email: string,
    password: string
}

const standard_user: User = { 
    email: "standard_user",
    password: "secret_sauce"
};

const locked_out_user: User = {
    email: "locked_out_user",
    password: "secret_sauce"
}

const problem_user: User = {
    email: "problem_user",
    password: "secret_sauce"
}
const performance_glitch_user: User = {
    email: "performance_glitch_user",
    password: "secret_sauce"
}
const error_user: User = {
    email: "error_user",
    password: "secret_sauce"
}

const visual_user: User = {
    email: "visual_user",
    password: "secret_sauce"
}

const not_existing_user: User = {
    email: "not_existing_user",
    password: "secret_sauce"   
}


export { type User, standard_user, locked_out_user, problem_user, performance_glitch_user, error_user, visual_user, not_existing_user};