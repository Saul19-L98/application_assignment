//NOTE: To userCredentialsStore.ts and authContext
export interface UserData{
    rol:string;
    employeeId:string;
}

//NOTE:  to ModalForm.tsx
export interface ApplicationType {
    employeeId:string;
    medicalUnit: string;
    startDate: string;
    endDate: string;
    doctorName: string;
    medicalDiagnostic: string;
    coverageDays: number;
}

//NOTE: To userCredentialsStore.ts
export interface ApplicationData extends ApplicationType{
    applicationId:string;
}

//NOTE: To userCredentialsStore.ts
export interface EmployeesData{
    employeeId:string;
    fullName:string;
    position:string;
    initialDate:string;
}

//NOTE: To Register.tsx
export interface UserRegister{
    email:string,
    password:string,
    rol: string,
    fullName: string,
    position:string,
    initialDate: string,
}

//NOTE: To LogIn.tsx
export interface UserLog{
    email:string,
    password:string,
}