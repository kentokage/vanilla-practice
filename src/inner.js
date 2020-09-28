// on 15

const message = JSON.stringify({
	message: 'Hello from iframe',
	date: Date.now()
  })
  
  // post to parent
  // child = window
  window.parent.postMessage(message, '*');

  window.addEventListener('message', e => {
	console.log("child frame: ", e.data)
  })