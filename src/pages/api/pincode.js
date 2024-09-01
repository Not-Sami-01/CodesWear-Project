import pincodes from '../../../data/pincodes.json'
export default function handler(req, res) {
  if (req.method === 'POST') {
    const pinCodes = pincodes;


    return res.status(200).json(pinCodes);

  } else {
    return res.status(401).json({ success: false, error: 'Invalid request method', message: 'This api only supports POST method' })
  }
}