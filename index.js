const got = require('got');
const _ = require('lodash');

/**
 * TODO
 *
 */
const getWakaTimeUsers = async () => {
  let usersInfo = []
  try {
    const response = await got('https://wakatime.com/api/v1/leaders');
    usersInfo = JSON.parse(_.get(response, 'body'))
  } catch (error) {
    console.log('error: ', error);
  }
  return usersInfo
}

const getWakaTimeProfile = async (data) => {
  const users = [];
  for (const user in data) {
    console.log('data[user]: ', data[user]);
    users.push({
      url: `https://wakatime.com/@${_.get(data[user], 'user.username')}`
    })
  }
  return users
}

(async () => {
  const users = await getWakaTimeUsers()
  const data = _.get(users, 'data');
  const wakaTimeProfiles = await getWakaTimeProfile(data);
  console.log('wakaTimeProfiles: ', wakaTimeProfiles);
})()
