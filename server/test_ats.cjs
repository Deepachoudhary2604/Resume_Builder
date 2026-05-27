const axios = require('axios');

async function test() {
  try {
    const reg = await axios.post('https://resume-builder-2-z2w9.onrender.com/api/users/register', { name: 'ATS', email: 'ats@t.com', password: 'p' });
    const token = reg.data.token;

    const res = await axios.post('https://resume-builder-2-z2w9.onrender.com/api/ai/ats-score', {
      resumeText: "React Node AWS",
      jobDescription: "Need React and AWS"
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(res.status, res.data);
  } catch (e) {
    console.error(e.response ? e.response.data : e.message);
  }
}
test();
