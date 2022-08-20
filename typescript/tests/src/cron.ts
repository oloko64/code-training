import schedule from 'node-schedule'

const job = schedule.scheduleJob('* * * * *', () => {
  console.log('The answer to life, the universe, and everything!')
})
