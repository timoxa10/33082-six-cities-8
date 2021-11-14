import camelСaseKeys from 'camelcase-keys';

const convertCamelСaseKeys = (data: any) =>
  camelСaseKeys(data, {
    deep: true,
  });

export default convertCamelСaseKeys;
