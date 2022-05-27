export default () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ email: "abc.xyz@mailinator.com", firstName: "Abc", lastName: "Xyz" });
    }, 500);
  });
}