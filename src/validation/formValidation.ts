import * as yup from "yup";


    yup.setLocale({
        mixed: {
            required: "campo richiesto!",
            default:"default!"
        },
        string: {
            min: `inserire almeno  4 caratteri `,
            max: 'inserire massimo 10 caratteri',
        }
    })



export const formSchema = yup.object().shape({
    name: yup.string().required("obbligatorio!").matches(/^[a-zA-Z]+$/),
    email: yup.string().email().required("obbligatorio!"),
    password:yup.string().min(4,'la password deve contenere almeno 4 caratteri!').max(10,'la password deve contenere massimo 10 caratteri!').matches( /^(?=.*[!@#%&])/, "deve contenere almeno un carattere speciale (!,@,#,%,&,)")
})