export const trimString = (str: string, maxLength: number): string => {
  if (str.length < maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
};
export const getShortDescription = (html: string, selector: string,maxLength=80) => {
  const shortDescElement = document.createElement('div');

  shortDescElement.innerHTML = html;
  let shortDesc = shortDescElement.querySelectorAll(selector)[2]?.textContent;
  if (!shortDesc) return;
  const newShortDesc = shortDesc.replace(/[&\\#,+()$~%.'":•*?<>{}-]/g, ''); //remove special character
  if (newShortDesc.length < maxLength) return newShortDesc;

  return `${newShortDesc.substring(0, maxLength)}...`;
};
