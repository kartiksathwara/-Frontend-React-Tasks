import { useState } from "react";

interface FormData {
    email: string;
    password: string;
    confirmPassword: string;
}

interface ValidationErrors {
    email: string;
    password: string;
    confirmPassword: string;
}

interface UseValidationResult{
    errors: ValidationErrors;
    validate: (formData: FormData) => boolean;
    clearError: (field: keyof ValidationErrors) => void;
}

const initialErrors: ValidationErrors ={
    email: "",
    password: "",
    confirmPassword: "",
};

export const useValidation = (): UseValidationResult => {
    const [errors, setErrors] = useState<ValidationErrors>(initialErrors);
    const validate = (formData: FormData): boolean => {
        let isValid = true;
        let newErrors: ValidationErrors = {...initialErrors};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        newErrors.email = "Enter a valid email address";
        isValid = false;
    }

    const strongPassword =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

    if (!strongPassword.test(formData.password)) {
        newErrors.password = "Password must include uppercase, lowercase, number, special character and mini 5 caracter";
        isValid = false;
    }

    if(formData.password !== formData.confirmPassword){
        newErrors.confirmPassword = "Password dose not match";
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
        
    };

    const clearError = (field: keyof ValidationErrors) => {
        setErrors((preErrors) => ({...preErrors, [field]:""}));
    };

    return{errors, validate, clearError}
}




// import { useState } from "react";

// // Define the shape of the form data relevant for validation
// interface FormData {
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// // Define the shape of the validation errors
// interface ValidationErrors {
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// // Define the return type of the hook
// interface UseValidationResult {
//   errors: ValidationErrors;
//   validate: (formData: FormData) => boolean;
//   clearError: (field: keyof ValidationErrors) => void;
// }

// const initialErrors: ValidationErrors = {
//   email: "",
//   password: "",
//   confirmPassword: "",
// };

// export const useValidation = (): UseValidationResult => {
//   const [errors, setErrors] = useState<ValidationErrors>(initialErrors);

//   // Function to validate the form data
//   const validate = (formData: FormData): boolean => {
//     let isValid = true;
//     let newErrors: ValidationErrors = { ...initialErrors }; // Start with a fresh set of errors

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       newErrors.email = "Enter a valid email address";
//       isValid = false;
//     }

//     // Password strength validation
//     const strongPassword =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

//     if (!strongPassword.test(formData.password)) {
//       newErrors.password =
//         "Password must include uppercase, lowercase, number, special character & min 5 characters";
//       isValid = false;
//     }

//     // Confirm password validation
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match!";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   // Function to clear a specific error when the user types
//   const clearError = (field: keyof ValidationErrors) => {
//     setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
//   };

//   return { errors, validate, clearError };
// };