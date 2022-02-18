import axios from 'axios';

export const baseURL = 'http://localhost:8080/api/v1/electricty';

async function getMeterByNumber(meterNumber) {
  const meter = await axios.get(`${baseURL}/meter/${meterNumber}`);

  return meter.data.message;
}
async function getTokenByMeterId(meterId) {
  const meter = await axios.get(`${baseURL}/${meterId}`);

  return meter.data.message;
}

async function buyElectricty(electricty) {
  const token = await axios.post(`${baseURL}/buy`, electricty);

  return token.data.body;
}

export { getMeterByNumber, getTokenByMeterId, buyElectricty };
