export const Pattern = {
  password: /^(?=.*[a-z])(?=.*[A-Z]).{5,25}$/,
  username: /^(?=.*[a-z])(?=.*[A-Z]).{5,20}$/,
  url: /^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/,
  size: /^.{1,2}$/,
};
