export const getShortDescription = (html: string, selector: string) => {
  const MAX_LENGTH = 100;
  const shortDescElement = document.createElement('div');

  shortDescElement.innerHTML = html;
  let shortDesc = shortDescElement.querySelectorAll(selector)[2]?.textContent;
  if (!shortDesc) return;
  const newShortDesc = shortDesc.replace(/[&\\#,+()$~%.'":•*?<>{}-]/g, ''); //remove special character
  if (newShortDesc.length < MAX_LENGTH) return newShortDesc;

  return `${newShortDesc.substring(0, MAX_LENGTH)}...`;
};
