export interface SigninEvent extends Event {
  detail: {
    isSignedIn: boolean;
    employeeID: string;
  };
}
