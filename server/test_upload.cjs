const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function test() {
  try {
    const formData = new FormData();
    formData.append('resumePdf', Buffer.from('%PDF-1.4 dummy pdf'), 'dummy.pdf');
    
    // get a token
    const reg = await axios.post('http://localhost:3000/api/users/register', { name: 't', email: 't4@t.com', password: 'p' });
    const token = reg.data.token;

    const res = await axios.post('http://localhost:3000/api/ai/parse', formData, {
      headers: { ...formData.getHeaders(), Authorization: `Bearer ${token}` }
    });
    console.log(res.status, res.data);
  } catch (e) {
    console.error(e.response ? e.response.data : e.message);
  }
}
test();
