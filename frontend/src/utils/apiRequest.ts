export const apiRequest = async ({
  url,
  body,
  method = 'POST'
}: {
  url: string;
  body?: string | object;
  method: string;
}) => {
  const bodyString = body && JSON.stringify(body);

  try {
    const data = await fetch(process.env.REACT_APP_DOMAIN + url, {
      body: bodyString,
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });
    return await data.json();
  } catch (e) {
    return e;
  }
};
