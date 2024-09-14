export const apiRequest = {
  async generic(url: string, method: string, body?: string | object) {
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
  },

  async get(url: string) {
    return this.generic(url, 'GET');
  },

  async post(url: string, body: string | object) {
    return this.generic(url, 'POST', body);
  },

  async delete(url: string, body?: string | object) {
    return this.generic(url, 'DELETE', body);
  }
};
