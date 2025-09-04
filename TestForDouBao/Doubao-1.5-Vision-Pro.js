// sk-044a134c2c7ca3794b952d77137f212dd4479fe4980c8fae1071e15289f15289
fetch('https://openai.qiniu.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer sk-044a134c2c7ca3794b952d77137f212dd4479fe4980c8fae1071e15289f15289',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      stream: false,
      model: 'doubao-1.5-vision-pro',
      messages: [{
        role: 'system',
        content: 'You are a helpful assistant.'
      },   {
        role: 'user',
        content: 'Hello!'
      }]
    })
  })