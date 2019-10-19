const request = require('request')

describe('Fetch data', () => {
  
  it('climate-watch api call', async () => {
    const options = {
      url: 'http://127.0.0.1:6200/api/get/climate-watch',
      method: 'POST',
    };
    await request(options, (error, response, data) => {
      console.log(response)
      expect(data.code).toBe(200);
    });
    //expect(res.body.user.email).toBe(demoUser.email);
  });
});