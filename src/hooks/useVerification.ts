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
