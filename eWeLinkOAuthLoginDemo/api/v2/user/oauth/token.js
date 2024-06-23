const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { code } = req.body;

  if (!code) {
    res.status(400).send('Bad Request: Missing code parameter');
    return;
  }

  try {
    const response = await axios.post('https://third-party-api.com/token', {
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching token', details: error.message });
  }
};
