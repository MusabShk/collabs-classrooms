import React, { useContext, useState } from "react";

const AuthUser = React.createContext({});

export default AuthUser;
// const AuthUser = React.createContext();
// const AuthUserFinder = React.createContext();

// export function useUser() {
//   return useContext(AuthUser);
// }

// export function useUserFinder() {
//   return useContext(AuthUserFinder);
// }

// export default function AuthUserProvider({ children }) {
//   const [loggedinUser, setLoggedinUser] = useState();

//   function fetchdata() {
//     console.log("context");
//     fetch("https://crm-management-6790c-default-rtdb.firebaseio.com/users.json")
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         let user = data.find((x) => x.email === localStorage.getItem("email"));
//         setLoggedinUser(user);
//       });
//   }
//   return (
//     <AuthUser.Provider value={loggedinUser}>
//       <AuthUserFinder.Provider value={fetchdata}>
//         {children}
//       </AuthUserFinder.Provider>
//     </AuthUser.Provider>
//   );
// }

// const Login=React.createContext(
//     var user;
//     fetch("https://crm-management-6790c-default-rtdb.firebaseio.com/users.json")
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//          user = data.find((x) => x.email === email.enteredEmail);
//       )}
// )
