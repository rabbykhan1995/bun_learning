interface User {
  name: string;
  email: string | null | undefined;
  age: number | null | undefined;
  address: string;
  id: number;
}

const rabby: User = {
  name: "rabby khan",
  email: "",
  age: undefined,
  address: "",
  id: 5,
};

const modifyName = <U extends { name: string }>(user: U) => {
  return (user.name = "abc");
};

modifyName(rabby);

console.log(rabby.name);
