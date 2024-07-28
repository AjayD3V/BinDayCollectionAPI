const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const port = process.env.PORT || 3000;

// Utility function to fetch and parse bin collection data
const fetchBinCollectionData = async (postcode) => {
  const url = `https://www.wolverhampton.gov.uk/find-my-nearest/${postcode.replace(/\s/g, '%20')}/100071194577`;
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  const binCollectionData = [];
  $('.jumbotron.jumbotron-fluid .row .col-md-4').each((i, element) => {
    const binType = $(element).find('h3').text().trim();
    const day = $(element).find('h4').first().text().replace('Day: ', '').trim();
    const nextDate = $(element).find('h4').last().text().replace('Next date: ', '').trim();
    if (binType && day && nextDate) {
      binCollectionData.push({ order: binCollectionData.length + 1, binType, day, nextDate });
    }
  });

  return binCollectionData;
};

// Endpoint to get bin collection data
app.get('/bin-collection', async (req, res) => {
  const postcode = req.query.postcode;
  if (!postcode) {
    return res.status(400).send({ error: 'Postcode is required' });
  }

  // Validate postcode format (simple regex for UK postcodes)
  const postcodeRegex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i;
  if (!postcodeRegex.test(postcode)) {
    return res.status(400).send({ error: 'Invalid postcode format' });
  }

  try {
    const binCollectionData = await fetchBinCollectionData(postcode);
    res.send(binCollectionData);
  } catch (error) {
    console.error('Error fetching bin collection data:', error.message);
    res.status(500).send({ error: 'Failed to fetch bin collection data' });
  }
});

app.listen(port, () => {
  console.log(`BinDayCollectionAPI listening at http://localhost:${port}`);
});
